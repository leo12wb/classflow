<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseStudentController;
use App\Http\Controllers\CourseTeacherController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentAdminController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LessonProgressController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TurmaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('courses', CourseController::class);

    Route::post('/courses/{course}/lessons', [LessonController::class, 'store'])->name('lessons.store');
    Route::get('/courses/{course}/lessons/create', [LessonController::class, 'create'])->name('lessons.create');
    Route::get('/courses/{course}/lessons/{lesson}/edit', [LessonController::class, 'edit'])->name('lessons.edit');
    Route::put('/courses/{course}/lessons/{lesson}', [LessonController::class, 'update'])->name('lessons.update');
    Route::delete('/courses/{course}/lessons/{lesson}', [LessonController::class, 'destroy'])->name('lessons.destroy');

    Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'store'])->name('courses.enroll');

    Route::get('/courses/{course}/teachers', [CourseTeacherController::class, 'edit'])->name('courses.teachers.edit');
    Route::put('/courses/{course}/teachers', [CourseTeacherController::class, 'update'])->name('courses.teachers.update');

    Route::get('/courses/{course}/students', [CourseStudentController::class, 'index'])->name('courses.students.index');
    Route::post('/courses/{course}/students', [CourseStudentController::class, 'store'])->name('courses.students.store');
    Route::delete('/courses/{course}/students/{user}', [CourseStudentController::class, 'destroy'])->name('courses.students.destroy');

    Route::get('/courses/{course}/turmas', [TurmaController::class, 'index'])->name('courses.turmas.index');
    Route::post('/courses/{course}/turmas', [TurmaController::class, 'store'])->name('courses.turmas.store');
    Route::put('/courses/{course}/turmas/{turma}', [TurmaController::class, 'update'])->name('courses.turmas.update');
    Route::delete('/courses/{course}/turmas/{turma}', [TurmaController::class, 'destroy'])->name('courses.turmas.destroy');

    Route::get('/admin/enrollments', [EnrollmentAdminController::class, 'index'])->name('admin.enrollments.index');
    Route::post('/admin/enrollments/{enrollment}/approve', [EnrollmentAdminController::class, 'approve'])->name('admin.enrollments.approve');
    Route::post('/admin/enrollments/{enrollment}/reject', [EnrollmentAdminController::class, 'reject'])->name('admin.enrollments.reject');

    Route::post('/lessons/{lesson}/complete', [LessonProgressController::class, 'complete'])->name('lessons.complete');

    Route::get('/certificates', [CertificateController::class, 'index'])->name('certificates.index');
    Route::get('/certificates/{certificate}/download', [CertificateController::class, 'download'])->name('certificates.download');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
