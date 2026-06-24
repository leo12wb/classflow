import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProgressBar from '@/Components/ProgressBar';
import { Head, Link } from '@inertiajs/react';

function StatCard({ title, value, icon, color }) {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        green: 'bg-green-50 text-green-600 border-green-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    };
    return (
        <div className={`rounded-xl border-2 p-6 ${colors[color]}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-80">{title}</p>
                    <p className="text-3xl font-bold mt-1">{value}</p>
                </div>
                <span className="text-3xl">{icon}</span>
            </div>
        </div>
    );
}

function StudentDashboard({ enrolledCount, completedCount, certificatesCount, courses }) {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard title="Cursos Matriculados" value={enrolledCount} icon="📚" color="blue" />
                <StatCard title="Cursos Concluídos" value={completedCount} icon="✅" color="green" />
                <StatCard title="Certificados" value={certificatesCount} icon="🏆" color="purple" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Meus Cursos</h3>
                    <Link href={route('courses.index')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Ver todos →
                    </Link>
                </div>
                {courses.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <p className="text-gray-400 text-sm">Você ainda não está matriculado em nenhum curso.</p>
                        <Link href={route('courses.index')} className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                            Explorar Cursos
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {courses.map((course) => (
                            <div key={course.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex-1 min-w-0 me-4">
                                        <Link href={route('courses.show', course.slug)} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                            {course.title}
                                        </Link>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {course.progress.completed}/{course.progress.total} aulas concluídas
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {course.progress.percentage === 100 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Concluído</span>
                                        )}
                                        <span className={`text-sm font-bold ${course.progress.percentage === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                                            {course.progress.percentage}%
                                        </span>
                                    </div>
                                </div>
                                <ProgressBar percentage={course.progress.percentage} showLabel={false} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {certificatesCount > 0 && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-1">🎓 Você tem {certificatesCount} certificado(s)!</h3>
                    <p className="text-blue-100 text-sm mb-4">Baixe seus certificados e compartilhe suas conquistas.</p>
                    <Link href={route('certificates.index')} className="inline-flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
                        Ver Certificados
                    </Link>
                </div>
            )}
        </>
    );
}

function TeacherDashboard({ coursesCount, totalStudents, publishedCount, courses }) {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard title="Meus Cursos" value={coursesCount} icon="📖" color="indigo" />
                <StatCard title="Cursos Publicados" value={publishedCount} icon="✅" color="green" />
                <StatCard title="Total de Alunos" value={totalStudents} icon="👥" color="orange" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Meus Cursos</h3>
                    <Link href={route('courses.create')} className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        + Novo Curso
                    </Link>
                </div>
                {courses.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <p className="text-gray-400 text-sm">Você ainda não criou nenhum curso.</p>
                        <Link href={route('courses.create')} className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                            Criar Primeiro Curso
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-50">
                        {courses.map((course) => (
                            <div key={course.id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                <div>
                                    <Link href={route('courses.show', course.slug)} className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                                        {course.title}
                                    </Link>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {course.lessons_count} aulas · {course.enrollments_count} alunos
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {course.status === 'published' ? 'Publicado' : 'Rascunho'}
                                    </span>
                                    <Link href={route('courses.edit', course.slug)} className="text-xs text-gray-400 hover:text-blue-600">Editar</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

function AdminDashboard({ totalCourses, totalStudents, totalTeachers, totalEnrollments, pendingEnrollments, courses }) {
    const stats = [
        {
            title: 'Cursos',
            value: totalCourses,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            bg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            valueColor: 'text-blue-700',
            label: 'publicados na plataforma',
        },
        {
            title: 'Alunos',
            value: totalStudents,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
            ),
            bg: 'bg-green-50',
            iconColor: 'text-green-600',
            valueColor: 'text-green-700',
            label: 'cadastrados',
        },
        {
            title: 'Professores',
            value: totalTeachers,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            bg: 'bg-indigo-50',
            iconColor: 'text-indigo-600',
            valueColor: 'text-indigo-700',
            label: 'ativos',
        },
        {
            title: 'Matrículas',
            value: totalEnrollments,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            bg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            valueColor: 'text-orange-700',
            label: 'no total',
        },
    ];

    return (
        <>
            {/* Pending enrollments alert */}
            {pendingEnrollments > 0 && (
                <Link
                    href={route('admin.enrollments.index')}
                    className="flex items-center justify-between gap-4 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 hover:bg-amber-100 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-amber-800">
                                {pendingEnrollments} solicitação(ões) de matrícula pendente(s)
                            </p>
                            <p className="text-xs text-amber-600 mt-0.5">Clique para revisar e aprovar</p>
                        </div>
                    </div>
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div key={s.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{s.title}</span>
                            <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.iconColor} flex items-center justify-center`}>
                                {s.icon}
                            </div>
                        </div>
                        <p className={`text-3xl font-extrabold ${s.valueColor}`}>{s.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Conteúdo em duas colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tabela de cursos recentes — ocupa 2/3 */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">Cursos recentes</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Últimos adicionados à plataforma</p>
                        </div>
                        <Link href={route('courses.index')} className="text-xs font-semibold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                            Ver todos →
                        </Link>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Curso</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Professor</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Alunos</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="px-6 py-3.5">
                                        <Link href={route('courses.show', course.slug)} className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
                                            {course.title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-3.5 text-gray-500 hidden sm:table-cell text-xs">{course.owner}</td>
                                    <td className="px-4 py-3.5 text-center">
                                        <span className="text-gray-700 font-semibold">{course.enrollments_count}</span>
                                    </td>
                                    <td className="px-4 py-3.5 text-center">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {course.status === 'published' ? 'Publicado' : 'Rascunho'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <Link href={route('courses.edit', course.slug)} className="text-xs text-gray-400 hover:text-blue-600 font-medium transition-colors">
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Ações rápidas — ocupa 1/3 */}
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                        <h3 className="font-semibold text-gray-900 mb-4">Ações rápidas</h3>
                        <div className="space-y-2">
                            {[
                                {
                                    label: 'Novo curso',
                                    desc: 'Criar e publicar um curso',
                                    href: route('courses.create'),
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    ),
                                    color: 'bg-blue-600 text-white hover:bg-blue-700',
                                },
                                {
                                    label: 'Solicitações de matrícula',
                                    desc: pendingEnrollments > 0 ? `${pendingEnrollments} aguardando revisão` : 'Nenhuma pendência',
                                    href: route('admin.enrollments.index'),
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    ),
                                    color: pendingEnrollments > 0 ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                                },
                                {
                                    label: 'Gerenciar cursos',
                                    desc: 'Ver e editar todos os cursos',
                                    href: route('courses.index'),
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    ),
                                    color: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                                },
                            ].map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${action.color}`}
                                >
                                    <div className="flex-shrink-0">{action.icon}</div>
                                    <div>
                                        <p className="text-sm font-semibold leading-tight">{action.label}</p>
                                        <p className="text-xs opacity-70 mt-0.5">{action.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Resumo rápido */}
                    <div className="bg-blue-600 rounded-2xl p-5 text-white">
                        <h3 className="font-semibold mb-1">Visão geral</h3>
                        <p className="text-blue-100 text-xs mb-4">Taxa de matrícula por curso</p>
                        <div className="space-y-3">
                            {courses.slice(0, 3).map((course) => {
                                const pct = totalStudents > 0 ? Math.round((course.enrollments_count / totalStudents) * 100) : 0;
                                return (
                                    <div key={course.id}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-blue-100 truncate flex-1 me-2">{course.title}</span>
                                            <span className="text-white font-bold">{course.enrollments_count}</span>
                                        </div>
                                        <div className="h-1.5 bg-blue-500/40 rounded-full overflow-hidden">
                                            <div className="h-full bg-white/80 rounded-full" style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const roleLabels = {
    admin: { label: 'Administrador', color: 'bg-red-100 text-red-700' },
    teacher: { label: 'Professor', color: 'bg-indigo-100 text-indigo-700' },
    student: { label: 'Aluno', color: 'bg-blue-100 text-blue-700' },
};

const roleSubtitles = {
    student: 'Acompanhe seu progresso nos cursos',
    teacher: 'Gerencie seus cursos e acompanhe seus alunos',
    admin: 'Visão geral da plataforma',
};

export default function Dashboard(props) {
    const { userRole, auth } = props;
    const role = roleLabels[userRole] ?? roleLabels.student;
    const firstName = auth?.user?.name?.split(' ')[0] ?? '';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-400 mb-0.5">
                            Olá, {firstName} 👋
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                        <p className="text-sm text-gray-500 mt-0.5">{roleSubtitles[userRole]}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${role.color}`}>
                        {role.label}
                    </span>
                </div>
            }
        >
            <Head title="Dashboard" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
                    {userRole === 'student' && <StudentDashboard {...props} />}
                    {userRole === 'teacher' && <TeacherDashboard {...props} />}
                    {userRole === 'admin' && <AdminDashboard {...props} />}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
