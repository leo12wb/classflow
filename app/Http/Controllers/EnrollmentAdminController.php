<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EnrollmentAdminController extends Controller
{
    public function index(): Response
    {
        abort_if(!auth()->user()->isAdmin(), 403);

        $pending = Enrollment::with('user', 'course.turmas')
            ->where('status', 'pending')
            ->latest()
            ->get()
            ->map(fn ($e) => [
                'id'           => $e->id,
                'user'         => ['id' => $e->user->id, 'name' => $e->user->name, 'email' => $e->user->email],
                'course'       => ['id' => $e->course->id, 'title' => $e->course->title, 'slug' => $e->course->slug],
                'turmas'       => $e->course->turmas->where('status', 'active')->values()
                    ->map(fn ($t) => ['id' => $t->id, 'name' => $t->name]),
                'requested_at' => $e->created_at?->format('d/m/Y H:i'),
            ]);

        return Inertia::render('Admin/Enrollments', [
            'pendingEnrollments' => $pending,
        ]);
    }

    public function approve(Request $request, Enrollment $enrollment): RedirectResponse
    {
        abort_if(!auth()->user()->isAdmin(), 403);

        $validated = $request->validate([
            'turma_id' => ['nullable', 'integer', 'exists:turmas,id'],
        ]);

        $enrollment->update([
            'status'   => 'approved',
            'turma_id' => $validated['turma_id'] ?? null,
        ]);

        return back()->with('success', "Matrícula de {$enrollment->user->name} aprovada.");
    }

    public function reject(Request $request, Enrollment $enrollment): RedirectResponse
    {
        abort_if(!auth()->user()->isAdmin(), 403);

        $validated = $request->validate([
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $enrollment->update([
            'status' => 'rejected',
            'notes'  => $validated['notes'] ?? null,
        ]);

        return back()->with('success', "Solicitação de {$enrollment->user->name} rejeitada.");
    }
}
