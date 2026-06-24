<?php

namespace App\Services;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class CertificateService
{
    public function issue(User $user, Course $course): Certificate
    {
        $existing = Certificate::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existing) {
            return $existing;
        }

        $code = $this->generateCode();

        $certificate = Certificate::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'certificate_code' => $code,
            'issued_at' => now(),
        ]);

        $pdfPath = $this->generatePdf($certificate);
        $certificate->update(['pdf_path' => $pdfPath]);

        return $certificate;
    }

    public function generatePdf(Certificate $certificate): string
    {
        $certificate->load(['user', 'course']);

        $pdf = Pdf::loadView('certificates.pdf', [
            'certificate' => $certificate,
        ])->setPaper('a4', 'landscape');

        $path = "certificates/{$certificate->certificate_code}.pdf";
        Storage::put($path, $pdf->output());

        return $path;
    }

    private function generateCode(): string
    {
        $count = Certificate::count() + 1;
        return 'CERT-' . date('Y') . '-' . str_pad($count, 6, '0', STR_PAD_LEFT);
    }
}
