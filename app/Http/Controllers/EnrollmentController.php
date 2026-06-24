<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function store(Request $request, Course $course): RedirectResponse
    {
        $user = $request->user();

        if ($course->status !== 'published') {
            return back()->with('error', 'Este curso não está disponível.');
        }

        $enrollment = Enrollment::withTrashed()
            ->where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($enrollment) {
            if ($enrollment->trashed()) {
                $enrollment->restore();
                $enrollment->update(['status' => 'pending', 'turma_id' => null]);

                return redirect()->route('courses.show', $course)
                    ->with('success', 'Solicitação de matrícula enviada! Aguarde a aprovação.');
            }

            $message = match ($enrollment->status) {
                'pending'  => 'Sua solicitação já está aguardando aprovação.',
                'approved' => 'Você já está matriculado neste curso.',
                'rejected' => 'Sua solicitação foi rejeitada. Entre em contato com o administrador.',
                default    => 'Situação atual: ' . $enrollment->status,
            };

            return redirect()->route('courses.show', $course)->with('info', $message);
        }

        Enrollment::create([
            'user_id'   => $user->id,
            'course_id' => $course->id,
            'status'    => 'pending',
        ]);

        return redirect()->route('courses.show', $course)
            ->with('success', 'Solicitação de matrícula enviada! Aguarde a aprovação do administrador.');
    }
}
