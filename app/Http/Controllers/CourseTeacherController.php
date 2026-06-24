<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class CourseTeacherController extends Controller
{
    public function edit(Course $course): Response
    {
        Gate::authorize('assignTeachers', Course::class);

        $teachers = User::where('role', 'teacher')
            ->orderBy('name')
            ->get()
            ->map(fn ($t) => [
                'id' => $t->id,
                'name' => $t->name,
                'email' => $t->email,
                'assigned' => $course->teachers->contains($t->id),
            ]);

        return Inertia::render('Courses/Teachers', [
            'course' => $course->only('id', 'title', 'slug'),
            'teachers' => $teachers,
        ]);
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        Gate::authorize('assignTeachers', Course::class);

        $validated = $request->validate([
            'teacher_ids' => ['array'],
            'teacher_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $teacherIds = collect($validated['teacher_ids'] ?? [])
            ->filter(fn ($id) => User::where('id', $id)->where('role', 'teacher')->exists());

        $course->teachers()->sync($teacherIds);

        return redirect()
            ->route('courses.show', $course)
            ->with('success', 'Professores atualizados com sucesso!');
    }
}
