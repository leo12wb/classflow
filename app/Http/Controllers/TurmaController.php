<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Turma;
use App\Services\ProgressService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TurmaController extends Controller
{
    public function __construct(private ProgressService $progressService) {}

    public function index(Course $course): Response
    {
        Gate::authorize('update', $course);

        $turmas = $course->turmas()
            ->with([
                'enrollments' => fn ($q) => $q->where('status', 'approved')->with('user'),
            ])
            ->latest()
            ->get()
            ->map(fn ($turma) => [
                'id'               => $turma->id,
                'name'             => $turma->name,
                'description'      => $turma->description,
                'status'           => $turma->status,
                'max_students'     => $turma->max_students,
                'enrollments_count' => $turma->enrollments->count(),
                'students'         => $turma->enrollments->map(fn ($e) => [
                    'id'          => $e->user->id,
                    'name'        => $e->user->name,
                    'email'       => $e->user->email,
                    'enrolled_at' => $e->created_at?->format('d/m/Y'),
                    'progress'    => $this->progressService->getProgress($e->user, $course),
                ]),
            ]);

        return Inertia::render('Turmas/Index', [
            'course' => $course->only('id', 'title', 'slug'),
            'turmas' => $turmas,
        ]);
    }

    public function store(Request $request, Course $course): RedirectResponse
    {
        Gate::authorize('update', $course);

        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'description'  => ['nullable', 'string'],
            'max_students' => ['nullable', 'integer', 'min:1'],
            'status'       => ['required', 'in:active,closed'],
        ]);

        $course->turmas()->create($validated);

        return back()->with('success', 'Turma criada com sucesso.');
    }

    public function update(Request $request, Course $course, Turma $turma): RedirectResponse
    {
        Gate::authorize('update', $course);

        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'description'  => ['nullable', 'string'],
            'max_students' => ['nullable', 'integer', 'min:1'],
            'status'       => ['required', 'in:active,closed'],
        ]);

        $turma->update($validated);

        return back()->with('success', 'Turma atualizada.');
    }

    public function destroy(Course $course, Turma $turma): RedirectResponse
    {
        Gate::authorize('update', $course);

        $turma->delete();

        return back()->with('success', 'Turma removida.');
    }
}
