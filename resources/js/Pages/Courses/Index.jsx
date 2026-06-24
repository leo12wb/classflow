import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProgressBar from '@/Components/ProgressBar';
import { Head, Link, router } from '@inertiajs/react';

function CourseCard({ course, userRole }) {
    const canManage = userRole === 'admin' || (userRole === 'teacher' && course.is_mine);
    const isStudent = userRole === 'student';

    const handleEnroll = () => {
        router.post(route('courses.enroll', course.slug));
    };

    const enrollStatus = course.enrollment_status;
    const isApproved = enrollStatus === 'approved';
    const isPending = enrollStatus === 'pending';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-600 relative overflow-hidden flex-shrink-0">
                {course.thumbnail ? (
                    <img src={`/storage/${course.thumbnail}`} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl">📚</span>
                    </div>
                )}
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                    {course.status === 'draft' && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded">
                            Rascunho
                        </span>
                    )}
                    {isStudent && isPending && (
                        <span className="bg-amber-400 text-amber-900 text-xs font-semibold px-2 py-1 rounded ms-auto">
                            Aguardando
                        </span>
                    )}
                    {isStudent && isApproved && (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded ms-auto">
                            Matriculado
                        </span>
                    )}
                    {course.is_mine && userRole === 'teacher' && (
                        <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded ms-auto">
                            Meu curso
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">{course.title}</h3>

                {course.owner && (
                    <p className="text-xs text-gray-400 mb-2">por {course.owner.name}</p>
                )}

                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{course.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span>⏱ {course.workload}h</span>
                    <span>📖 {course.lessons_count} aulas</span>
                    <span>👥 {course.enrollments_count} alunos</span>
                </div>

                {isStudent && isApproved && course.progress && (
                    <div className="mb-4">
                        <ProgressBar percentage={course.progress.percentage} />
                    </div>
                )}

                <div className="flex gap-2 mt-auto">
                    <Link
                        href={route('courses.show', course.slug)}
                        className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        {isStudent && isApproved ? 'Continuar' : 'Ver Curso'}
                    </Link>

                    {isStudent && !course.enrolled && course.status === 'published' && (
                        <button
                            onClick={handleEnroll}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                        >
                            Solicitar
                        </button>
                    )}

                    {isStudent && isPending && (
                        <span className="px-3 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-xs font-medium flex items-center">
                            ⏳
                        </span>
                    )}

                    {canManage && (
                        <Link
                            href={route('courses.edit', course.slug)}
                            className="px-3 py-2 border border-gray-200 text-gray-500 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                            title="Editar curso"
                        >
                            ✏️
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CoursesIndex({ courses, userRole }) {
    const canCreate = userRole === 'admin' || userRole === 'teacher';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Cursos</h2>
                        <p className="text-sm text-gray-500 mt-1">{courses.length} curso(s) disponível(is)</p>
                    </div>
                    {canCreate && (
                        <Link
                            href={route('courses.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            + Novo Curso
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Cursos" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {courses.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-400">Nenhum curso disponível no momento.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} userRole={userRole} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
