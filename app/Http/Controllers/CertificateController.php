<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Services\CertificateService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function __construct(private CertificateService $certificateService) {}

    public function index(Request $request): \Inertia\Response
    {
        $certificates = Certificate::with('course')
            ->where('user_id', $request->user()->id)
            ->latest('issued_at')
            ->get()
            ->map(fn ($cert) => [
                'id' => $cert->id,
                'certificate_code' => $cert->certificate_code,
                'issued_at' => $cert->issued_at?->format('d/m/Y'),
                'course' => [
                    'title' => $cert->course->title,
                    'workload' => $cert->course->workload,
                ],
            ]);

        return Inertia::render('Certificates/Index', [
            'certificates' => $certificates,
        ]);
    }

    public function download(Certificate $certificate): Response
    {
        if ($certificate->user_id !== auth()->id()) {
            abort(403);
        }

        if (!$certificate->pdf_path || !Storage::exists($certificate->pdf_path)) {
            $this->certificateService->generatePdf($certificate);
            $certificate->refresh();
        }

        return response(Storage::get($certificate->pdf_path), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"{$certificate->certificate_code}.pdf\"",
        ]);
    }
}
