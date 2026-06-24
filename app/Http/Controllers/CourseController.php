<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Course;
use App\Models\Enrollment;
use App\Services\ProgressService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(private ProgressService $progressService) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $query = Course::with('owner', 'teachers')->withCount('lessons', 'enrollments');

        if ($user->isAdmin()) {
            // admin vê tudo
        } elseif ($user->isTeacher()) {
            // teacher vê: os que criou, os que foi atribuído + publicados de outros
            $query->where(function ($q) use ($user) {
                $q->where('user_id', $user->id)
                  ->orWhereHas('teachers', fn ($q2) => $q2->where('users.id', $user->id))
                  ->orWhere('status', 'published');
            });
        } else {
            $query->where('status', 'published');
        }

        $courses = $query->latest()->get()->map(function ($course) use ($user) {
            $enrollment = $user->isStudent()
                ? Enrollment::where('user_id', $user->id)->where('course_id', $course->id)->first()
                : null;

            $progress = ($enrollment && $enrollment->status === 'approved')
                ? $this->progressService->getProgress($user, $course)
                : null;

            return [
                'id'                => $course->id,
                'title'             => $course->title,
                'slug'              => $course->slug,
                'description'       => $course->description,
                'thumbnail'         => $course->thumbnail,
                'workload'          => $course->workload,
                'status'            => $course->status,
                'lessons_count'     => $course->lessons_count,
                'enrollments_count' => $course->enrollments_count,
                'owner'             => $course->owner ? ['id' => $course->owner->id, 'name' => $course->owner->name] : null,
                'is_mine'           => $user->isAdmin() || $course->user_id === $user->id || $course->teachers->contains($user->id),
                'enrolled'          => (bool) $enrollment,
                'enrollment_status' => $enrollment?->status,
                'progress'          => $progress,
            ];
        });

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'userRole' => $user->role,
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Course::class);
        return Inertia::render('Courses/Create');
    }

    public function store(StoreCourseRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        if ($request->hasFile('thumbnail')) {
            $data['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        Course::create($data);

        return redirect()->route('courses.index')->with('success', 'Curso criado com sucesso!');
    }

    public function show(Request $request, Course $course): Response
    {
        Gate::authorize('view', $course);

        $user = $request->user();
        $enrollment = $user->isStudent()
            ? Enrollment::with('turma')->where('user_id', $user->id)->where('course_id', $course->id)->first()
            : null;

        $enrollmentData = null;
        $isApprovedStudent = false;
        if ($enrollment) {
            $isApprovedStudent = $enrollment->status === 'approved';
            $enrollmentData = [
                'id'         => $enrollment->id,
                'status'     => $enrollment->status,
                'turma_id'   => $enrollment->turma_id,
                'turma_name' => $enrollment->turma?->name,
            ];
        }

        $lessons = $course->lessons()->get()->map(function ($lesson) use ($user, $isApprovedStudent) {
            $progress = ($user->isStudent() && $isApprovedStudent)
                ? $lesson->progress()->where('user_id', $user->id)->first()
                : null;
            return [
                'id'        => $lesson->id,
                'title'     => $lesson->title,
                'slug'      => $lesson->slug,
                'position'  => $lesson->position,
                'video_url' => $lesson->video_url,
                'content'   => $lesson->content,
                'completed' => $progress?->completed ?? false,
            ];
        });

        $progress = $isApprovedStudent
            ? $this->progressService->getProgress($user, $course)
            : null;

        $course->load('teachers');
        $canManage = $user->isAdmin() || ($user->isTeacher() && $course->hasTeacher($user));

        return Inertia::render('Courses/Show', [
            'course' => array_merge($course->toArray(), [
                'owner'    => $course->owner ? ['id' => $course->owner->id, 'name' => $course->owner->name] : null,
                'teachers' => $course->teachers->map(fn ($t) => ['id' => $t->id, 'name' => $t->name]),
            ]),
            'lessons'    => $lessons,
            'enrollment' => $enrollmentData,
            'progress'   => $progress,
            'userRole'   => $user->role,
            'canManage'  => $canManage,
        ]);
    }

    public function edit(Course $course): Response
    {
        Gate::authorize('update', $course);
        return Inertia::render('Courses/Edit', ['course' => $course]);
    }

    public function update(StoreCourseRequest $request, Course $course): RedirectResponse
    {
        Gate::authorize('update', $course);

        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            if ($course->thumbnail) {
                Storage::disk('public')->delete($course->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        $course->update($data);

        return redirect()->route('courses.show', $course)->with('success', 'Curso atualizado!');
    }

    public function destroy(Course $course): RedirectResponse
    {
        Gate::authorize('delete', $course);

        if ($course->thumbnail) {
            Storage::disk('public')->delete($course->thumbnail);
        }

        $course->delete();

        return redirect()->route('courses.index')->with('success', 'Curso removido!');
    }
}
