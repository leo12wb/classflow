<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class LessonController extends Controller
{
    public function create(Course $course): Response
    {
        Gate::authorize('manageLesson', $course);
        return Inertia::render('Lessons/Create', ['course' => $course]);
    }

    public function store(StoreLessonRequest $request, Course $course): RedirectResponse
    {
        Gate::authorize('manageLesson', $course);
        $course->lessons()->create($request->validated());

        return redirect()->route('courses.show', $course)->with('success', 'Aula criada com sucesso!');
    }

    public function edit(Course $course, Lesson $lesson): Response
    {
        Gate::authorize('manageLesson', $course);
        return Inertia::render('Lessons/Edit', [
            'course' => $course,
            'lesson' => $lesson,
        ]);
    }

    public function update(StoreLessonRequest $request, Course $course, Lesson $lesson): RedirectResponse
    {
        Gate::authorize('manageLesson', $course);
        $lesson->update($request->validated());

        return redirect()->route('courses.show', $course)->with('success', 'Aula atualizada!');
    }

    public function destroy(Course $course, Lesson $lesson): RedirectResponse
    {
        Gate::authorize('manageLesson', $course);
        $lesson->delete();

        return redirect()->route('courses.show', $course)->with('success', 'Aula removida!');
    }
}
