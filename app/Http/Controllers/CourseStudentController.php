<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use App\Services\ProgressService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CourseStudentController extends Controller
{
    public function __construct(private ProgressService $progressService) {}

    public function index(Course $course): Response
    {
        Gate::authorize('viewStudents', $course);

        $course->load('teachers');

        $students = Enrollment::with('user', 'turma')
            ->where('course_id', $course->id)
            ->where('status', 'approved')
            ->latest()
            ->get()
            ->map(fn($enrollment) => [
                'id'          => $enrollment->user->id,
                'name'        => $enrollment->user->name,
                'email'       => $enrollment->user->email,
                'enrolled_at' => $enrollment->created_at?->format('d/m/Y') ?? '—',
                'turma_name'  => $enrollment->turma?->name,
                'progress'    => $this->progressService->getProgress($enrollment->user, $course),
            ]);

        $availableStudents = [];
        $turmas = [];
        if (auth()->user()->isAdmin()) {
            $enrolledIds = $students->pluck('id');
            $availableStudents = User::where('role', 'student')
                ->whereNotIn('id', $enrolledIds)
                ->orderBy('name')
                ->get(['id', 'name', 'email']);

            $turmas = $course->turmas()
                ->where('status', 'active')
                ->orderBy('name')
                ->get(['id', 'name']);
        }

        return Inertia::render('Courses/Students', [
            'course'            => $course->only('id', 'title', 'slug'),
            'students'          => $students,
            'availableStudents' => $availableStudents,
            'turmas'            => $turmas,
            'userRole'          => auth()->user()->role,
        ]);
    }

    public function store(Request $request, Course $course): RedirectResponse
    {
        Gate::authorize('manageStudents', Course::class);

        $validated = $request->validate([
            'user_id'  => ['required', 'integer', 'exists:users,id'],
            'turma_id' => ['required', 'integer', 'exists:turmas,id'],
        ]);

        $student = User::findOrFail($validated['user_id']);

        if ($student->role !== 'student') {
            return back()->with('error', 'Apenas usuários com papel de aluno podem ser matriculados.');
        }

        $enrollment = Enrollment::withTrashed()
            ->where('user_id', $student->id)
            ->where('course_id', $course->id)
            ->first();

        $turmaId = $validated['turma_id'] ?? null;

        if ($enrollment) {
            if ($enrollment->trashed()) {
                $enrollment->restore();
            }
            $enrollment->update(['status' => 'approved', 'turma_id' => $turmaId]);
        } else {
            Enrollment::create([
                'user_id'   => $student->id,
                'course_id' => $course->id,
                'status'    => 'approved',
                'turma_id'  => $turmaId,
            ]);
        }

        return back()->with('success', "{$student->name} foi matriculado com sucesso.");
    }

    public function destroy(Course $course, User $user): RedirectResponse
    {
        Gate::authorize('manageStudents', Course::class);

        Enrollment::where('course_id', $course->id)
            ->where('user_id', $user->id)
            ->delete();

        return back()->with('success', "{$user->name} foi removido do curso.");
    }
}
