import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProgressBar from '@/Components/ProgressBar';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

function LessonItem({ lesson, onComplete }) {
    const [loading, setLoading] = useState(false);

    const handleComplete = async () => {
        setLoading(true);
        try {
            const res = await axios.post(route('lessons.complete', lesson.id));
            onComplete(lesson.id, res.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${lesson.completed ? 'border-green-100 bg-green-50' : 'border-gray-100 bg-white hover:border-blue-100'}`}>
            <button
                onClick={handleComplete}
                disabled={lesson.completed || loading}
                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all
                    ${lesson.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 hover:border-blue-400 text-transparent hover:text-blue-400 disabled:opacity-50'
                    }`}
            >
                {loading ? (
                    <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${lesson.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                    {lesson.position}. {lesson.title}
                </p>
                {lesson.video_url && (
                    <a href={lesson.video_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                        ▶ Assistir vídeo
                    </a>
                )}
            </div>

            {lesson.completed && (
                <span className="text-xs text-green-600 font-medium">✓ Concluída</span>
            )}
        </div>
    );
}

export default function CourseShow({ course, lessons: initialLessons, enrollment, progress: initialProgress, userRole, canManage }) {
    const isStudent = userRole === 'student';
    const isApproved = enrollment?.status === 'approved';
    const isPending = enrollment?.status === 'pending';
    const isRejected = enrollment?.status === 'rejected';

    const [lessons, setLessons] = useState(initialLessons);
    const [progress, setProgress] = useState(initialProgress);
    const [certificateCode, setCertificateCode] = useState(null);

    const handleEnroll = () => {
        router.post(route('courses.enroll', course.slug));
    };

    const handleLessonComplete = (lessonId, data) => {
        setLessons((prev) =>
            prev.map((l) => l.id === lessonId ? { ...l, completed: true } : l)
        );
        setProgress(data.progress);

        if (data.certificate_issued) {
            setCertificateCode(data.certificate_code);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href={route('courses.index')} className="hover:text-blue-600">Cursos</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">{course.title}</span>
                </div>
            }
        >
            <Head title={course.title} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg mb-5 flex items-center justify-center overflow-hidden">
                                    {course.thumbnail ? (
                                        <img src={`/storage/${course.thumbnail}`} alt={course.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl">📚</span>
                                    )}
                                </div>

                                <h1 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h1>
                                <p className="text-sm text-gray-500 mb-5">{course.description}</p>

                                <div className="space-y-2 text-sm mb-5">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span>⏱</span> <span>{course.workload} horas</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <span>📖</span> <span>{lessons.length} aulas</span>
                                    </div>
                                    {course.teachers && course.teachers.length > 0 && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <p className="text-xs text-gray-400 mb-2">Professores</p>
                                            <div className="flex flex-wrap gap-1">
                                                {course.teachers.map((t) => (
                                                    <span key={t.id} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-indigo-50 text-indigo-700">
                                                        {t.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Progress bar — only for approved students */}
                                {isStudent && isApproved && progress && (
                                    <div className="mb-5">
                                        <ProgressBar percentage={progress.percentage} />
                                        <p className="text-xs text-gray-400 mt-1 text-center">
                                            {progress.completed} de {progress.total} aulas concluídas
                                        </p>
                                    </div>
                                )}

                                {/* Turma badge — approved students */}
                                {isStudent && isApproved && enrollment.turma_name && (
                                    <div className="mb-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Turma: {enrollment.turma_name}
                                        </span>
                                    </div>
                                )}

                                {/* Enrollment actions */}
                                {isStudent && !enrollment && course.status === 'published' && (
                                    <button
                                        onClick={handleEnroll}
                                        className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Solicitar Inscrição
                                    </button>
                                )}

                                {isStudent && isPending && (
                                    <div className="w-full py-2.5 text-center bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm font-medium">
                                        ⏳ Aguardando aprovação
                                    </div>
                                )}

                                {isStudent && isRejected && (
                                    <div className="w-full py-2.5 text-center bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
                                        ✕ Solicitação rejeitada
                                    </div>
                                )}

                                {/* Manage actions */}
                                {canManage && (
                                    <div className="flex flex-col gap-2 mt-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('courses.edit', course.slug)}
                                                className="flex-1 text-center py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
                                            >
                                                Editar Curso
                                            </Link>
                                            <Link
                                                href={route('lessons.create', course.slug)}
                                                className="flex-1 text-center py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                                            >
                                                + Aula
                                            </Link>
                                        </div>
                                        <Link
                                            href={route('courses.turmas.index', course.slug)}
                                            className="w-full text-center py-2 border border-indigo-200 text-indigo-600 rounded-lg text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                            Gerenciar Turmas
                                        </Link>
                                        <Link
                                            href={route('courses.students.index', course.slug)}
                                            className="w-full text-center py-2 border border-blue-200 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Ver Alunos
                                        </Link>
                                        {userRole === 'admin' && (
                                            <Link
                                                href={route('courses.teachers.edit', course.slug)}
                                                className="w-full text-center py-2 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                                            >
                                                👨‍🏫 Gerenciar Professores
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Certificate alert */}
                            {certificateCode && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                    <h3 className="font-semibold text-green-800 mb-1">🎉 Parabéns! Curso concluído!</h3>
                                    <p className="text-sm text-green-700 mb-3">Seu certificado foi gerado com o código: <strong>{certificateCode}</strong></p>
                                    <Link
                                        href={route('certificates.index')}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                                    >
                                        Baixar Certificado
                                    </Link>
                                </div>
                            )}

                            {/* Pending notice */}
                            {isStudent && isPending && (
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
                                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-amber-800">Solicitação enviada</p>
                                        <p className="text-sm text-amber-700 mt-0.5">Sua inscrição está aguardando aprovação do administrador. Você receberá acesso às aulas assim que for aprovado.</p>
                                    </div>
                                </div>
                            )}

                            {/* Rejected notice */}
                            {isStudent && isRejected && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3">
                                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-red-800">Solicitação rejeitada</p>
                                        <p className="text-sm text-red-700 mt-0.5">Entre em contato com o administrador para mais informações.</p>
                                    </div>
                                </div>
                            )}

                            {/* Lessons */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="text-lg font-semibold text-gray-900">Aulas do Curso</h2>
                                </div>

                                {lessons.length === 0 ? (
                                    <div className="px-6 py-12 text-center">
                                        <p className="text-gray-400 text-sm">Nenhuma aula cadastrada ainda.</p>
                                    </div>
                                ) : (
                                    <div className="p-4 space-y-2">
                                        {lessons.map((lesson) => (
                                            canManage ? (
                                                <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <div className="w-7 h-7 rounded-full flex-shrink-0 bg-indigo-100 flex items-center justify-center">
                                                        <span className="text-indigo-600 text-xs font-bold">{lesson.position}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-800 flex-1">{lesson.title}</p>
                                                    <Link href={route('lessons.edit', { course: course.slug, lesson: lesson.id })} className="text-xs text-gray-400 hover:text-blue-600">Editar</Link>
                                                </div>
                                            ) : isApproved && isStudent ? (
                                                <LessonItem
                                                    key={lesson.id}
                                                    lesson={lesson}
                                                    onComplete={handleLessonComplete}
                                                />
                                            ) : (
                                                <div key={lesson.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-gray-50">
                                                    <div className="w-7 h-7 rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center">
                                                        <span className="text-gray-400 text-xs">🔒</span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">{lesson.position}. {lesson.title}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
