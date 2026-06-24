<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Services\CertificateService;
use App\Services\ProgressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LessonProgressController extends Controller
{
    public function __construct(
        private ProgressService $progressService,
        private CertificateService $certificateService
    ) {}

    public function complete(Request $request, Lesson $lesson): JsonResponse
    {
        $user = $request->user();

        $enrollment = $user->enrollments()->where('course_id', $lesson->course_id)->first();

        if (!$enrollment) {
            return response()->json(['error' => 'Você não está matriculado neste curso.'], 403);
        }

        $this->progressService->markLessonCompleted($user, $lesson->id);

        $course = $lesson->course;
        $progress = $this->progressService->getProgress($user, $course);

        $certificate = null;
        if ($progress['percentage'] === 100) {
            $certificate = $this->certificateService->issue($user, $course);
        }

        return response()->json([
            'progress' => $progress,
            'certificate_issued' => $certificate !== null,
            'certificate_code' => $certificate?->certificate_code,
        ]);
    }
}
