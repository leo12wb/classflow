<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;

class CoursePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Course $course): bool
    {
        if ($user->isAdmin()) return true;
        if ($user->isTeacher() && $course->hasTeacher($user)) return true;
        return $course->status === 'published';
    }

    public function create(User $user): bool
    {
        return $user->canManageCourses();
    }

    public function update(User $user, Course $course): bool
    {
        if ($user->isAdmin()) return true;
        return $user->isTeacher() && $course->hasTeacher($user);
    }

    public function delete(User $user, Course $course): bool
    {
        if ($user->isAdmin()) return true;
        return $user->isTeacher() && $course->user_id === $user->id;
    }

    public function manageLesson(User $user, Course $course): bool
    {
        if ($user->isAdmin()) return true;
        return $user->isTeacher() && $course->hasTeacher($user);
    }

    public function assignTeachers(User $user): bool
    {
        return $user->isAdmin();
    }

    public function viewStudents(User $user, Course $course): bool
    {
        if ($user->isAdmin()) return true;
        return $user->isTeacher() && $course->hasTeacher($user);
    }

    public function manageStudents(User $user): bool
    {
        return $user->isAdmin();
    }
}
