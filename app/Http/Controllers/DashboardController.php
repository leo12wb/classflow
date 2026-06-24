<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Services\ProgressService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private ProgressService $progressService) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->isTeacher()) {
            return $this->teacherDashboard($user);
        }

        if ($user->isAdmin()) {
            return $this->adminDashboard($user);
        }

        return $this->studentDashboard($user);
    }

    private function studentDashboard($user): Response
    {
        $enrollments = Enrollment::with('course.lessons')
            ->where('user_id', $user->id)
            ->get();

        $coursesWithProgress = $enrollments->map(function ($enrollment) use ($user) {
            $course = $enrollment->course;
            $progress = $this->progressService->getProgress($user, $course);

            return [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'thumbnail' => $course->thumbnail,
                'workload' => $course->workload,
                'progress' => $progress,
            ];
        });

        $completedCount = $coursesWithProgress->filter(fn ($c) => $c['progress']['percentage'] === 100)->count();

        return Inertia::render('Dashboard', [
            'userRole' => 'student',
            'enrolledCount' => $enrollments->count(),
            'completedCount' => $completedCount,
            'certificatesCount' => $user->certificates()->count(),
            'courses' => $coursesWithProgress,
        ]);
    }

    private function teacherDashboard($user): Response
    {
        $courses = Course::withCount('lessons', 'enrollments')
            ->where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn ($course) => [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'thumbnail' => $course->thumbnail,
                'status' => $course->status,
                'lessons_count' => $course->lessons_count,
                'enrollments_count' => $course->enrollments_count,
            ]);

        return Inertia::render('Dashboard', [
            'userRole' => 'teacher',
            'coursesCount' => $courses->count(),
            'totalStudents' => $courses->sum('enrollments_count'),
            'publishedCount' => $courses->where('status', 'published')->count(),
            'courses' => $courses,
        ]);
    }

    private function adminDashboard($user): Response
    {
        $totalCourses = Course::count();
        $totalStudents = \App\Models\User::where('role', 'student')->count();
        $totalTeachers = \App\Models\User::where('role', 'teacher')->count();
        $totalEnrollments = Enrollment::where('status', 'approved')->count();
        $pendingEnrollments = Enrollment::where('status', 'pending')->count();

        $recentCourses = Course::with('owner')->withCount('enrollments')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($course) => [
                'id'                => $course->id,
                'title'             => $course->title,
                'slug'              => $course->slug,
                'status'            => $course->status,
                'enrollments_count' => $course->enrollments_count,
                'owner'             => $course->owner?->name ?? 'Admin',
            ]);

        return Inertia::render('Dashboard', [
            'userRole'           => 'admin',
            'totalCourses'       => $totalCourses,
            'totalStudents'      => $totalStudents,
            'totalTeachers'      => $totalTeachers,
            'totalEnrollments'   => $totalEnrollments,
            'pendingEnrollments' => $pendingEnrollments,
            'courses'            => $recentCourses,
        ]);
    }
}
