<?php

namespace App\Services;

use App\Models\Course;
use App\Models\LessonProgress;
use App\Models\User;

class ProgressService
{
    public function getProgress(User $user, Course $course): array
    {
        $totalLessons = $course->lessons()->count();

        if ($totalLessons === 0) {
            return ['percentage' => 0, 'completed' => 0, 'total' => 0];
        }

        $completedLessons = LessonProgress::where('user_id', $user->id)
            ->whereIn('lesson_id', $course->lessons()->pluck('id'))
            ->where('completed', true)
            ->count();

        $percentage = (int) round(($completedLessons / $totalLessons) * 100);

        return [
            'percentage' => $percentage,
            'completed' => $completedLessons,
            'total' => $totalLessons,
        ];
    }

    public function isCourseCompleted(User $user, Course $course): bool
    {
        $progress = $this->getProgress($user, $course);
        return $progress['percentage'] === 100;
    }

    public function markLessonCompleted(User $user, int $lessonId): LessonProgress
    {
        return LessonProgress::updateOrCreate(
            ['user_id' => $user->id, 'lesson_id' => $lessonId],
            ['completed' => true, 'completed_at' => now()]
        );
    }
}
