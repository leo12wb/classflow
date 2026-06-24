import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

function EnrollmentRow({ enrollment }) {
    const [turmaId, setTurmaId] = useState('');
    const [rejectNotes, setRejectNotes] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleApprove = () => {
        setProcessing(true);
        router.post(route('admin.enrollments.approve', enrollment.id), { turma_id: turmaId || null }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    const handleReject = () => {
        if (!showRejectInput) {
            setShowRejectInput(true);
            return;
        }
        setProcessing(true);
        router.post(route('admin.enrollments.reject', enrollment.id), { notes: rejectNotes }, {
            preserveScroll: true,
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Student info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-700 font-bold text-sm">
                            {enrollment.user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{enrollment.user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{enrollment.user.email}</p>
                    </div>
                </div>

                {/* Course info */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">Curso solicitado</p>
                    <Link href={route('courses.show', enrollment.course.slug)} className="text-sm font-medium text-blue-600 hover:underline truncate block">
                        {enrollment.course.title}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">Solicitado em {enrollment.requested_at}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0 w-full sm:w-64">
                    {enrollment.turmas.length > 0 && (
                        <select
                            value={turmaId}
                            onChange={(e) => setTurmaId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Turma (opcional)</option>
                            {enrollment.turmas.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    )}
                    {enrollment.turmas.length === 0 && (
                        <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                            Nenhuma turma ativa — crie turmas primeiro.
                        </p>
                    )}

                    {showRejectInput && (
                        <textarea
                            value={rejectNotes}
                            onChange={(e) => setRejectNotes(e.target.value)}
                            rows={2}
                            placeholder="Motivo da rejeição (opcional)"
                            className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    )}

                    <div className="flex gap-2">
                        <button
                            onClick={handleApprove}
                            disabled={processing}
                            className="flex-1 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-60 transition-colors"
                        >
                            ✓ Aprovar
                        </button>
                        <button
                            onClick={handleReject}
                            disabled={processing}
                            className="flex-1 py-1.5 bg-red-50 text-red-600 border border-red-200 text-sm font-semibold rounded-lg hover:bg-red-100 disabled:opacity-60 transition-colors"
                        >
                            {showRejectInput ? 'Confirmar' : '✕ Rejeitar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminEnrollments({ pendingEnrollments }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Solicitações de Matrícula</h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            {pendingEnrollments.length} solicitação(ões) pendente(s)
                        </p>
                    </div>
                    <Link href={route('dashboard')} className="text-sm text-gray-500 hover:text-blue-600">
                        ← Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Solicitações de Matrícula" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {pendingEnrollments.length === 0 ? (
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-20 text-center">
                            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-700 font-semibold text-lg">Tudo em dia!</p>
                            <p className="text-gray-400 text-sm mt-1">Não há solicitações de matrícula pendentes.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pendingEnrollments.map((enrollment) => (
                                <EnrollmentRow key={enrollment.id} enrollment={enrollment} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
