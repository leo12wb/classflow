import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

function Avatar({ name }) {
    const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    return (
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {initials}
        </div>
    );
}

function ProgressBadge({ pct }) {
    const color = pct === 100 ? 'bg-green-100 text-green-700' : pct > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500';
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
            {pct === 100 && (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            )}
            {pct}%
        </span>
    );
}

export default function CourseStudents({ course, students, availableStudents, turmas, userRole }) {
    const isAdmin = userRole === 'admin';
    const [search, setSearch] = useState('');
    const [confirmRemove, setConfirmRemove] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({ user_id: '', turma_id: '' });

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleEnroll = (e) => {
        e.preventDefault();
        post(route('courses.students.store', course.slug), {
            onSuccess: () => reset(),
        });
    };

    const handleRemove = (studentId) => {
        router.delete(route('courses.students.destroy', { course: course.slug, user: studentId }), {
            onSuccess: () => setConfirmRemove(null),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Link href={route('courses.index')} className="hover:text-blue-600 transition-colors">Cursos</Link>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href={route('courses.show', course.slug)} className="hover:text-blue-600 transition-colors">{course.title}</Link>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-900 font-medium">Alunos</span>
                </div>
            }
        >
            <Head title={`Alunos — ${course.title}`} />

            <div className="py-10">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Cabeçalho */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Turma do curso</h1>
                            <p className="text-gray-500 text-sm mt-1">{course.title}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-blue-700 font-bold text-sm">{students.length}</span>
                            <span className="text-blue-500 text-xs">alunos matriculados</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Lista de alunos */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                {/* Barra de busca */}
                                <div className="px-6 py-4 border-b border-gray-50">
                                    <div className="relative">
                                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Buscar aluno por nome ou e-mail..."
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {filtered.length === 0 ? (
                                    <div className="py-16 text-center">
                                        <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-gray-400 text-sm">
                                            {search ? 'Nenhum aluno encontrado.' : 'Nenhum aluno matriculado neste curso ainda.'}
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Header da tabela */}
                                        <div className="grid grid-cols-12 px-6 py-2.5 bg-gray-50/60 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            <div className="col-span-4">Aluno</div>
                                            <div className="col-span-3 hidden sm:block">Turma</div>
                                            <div className="col-span-2 hidden sm:block text-center">Matrícula</div>
                                            <div className="col-span-2 text-center">Progresso</div>
                                            <div className="col-span-1 text-center">Aulas</div>
                                        </div>

                                        <div className="divide-y divide-gray-50">
                                            {filtered.map((student) => (
                                                <div key={student.id} className="grid grid-cols-12 items-center px-6 py-3.5 hover:bg-gray-50/50 transition-colors group">
                                                    {/* Nome + email */}
                                                    <div className="col-span-4 flex items-center gap-3">
                                                        <Avatar name={student.name} />
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                                                            <p className="text-xs text-gray-400 truncate">{student.email}</p>
                                                        </div>
                                                    </div>

                                                    {/* Turma */}
                                                    <div className="col-span-3 hidden sm:block">
                                                        {student.turma_name ? (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                                {student.turma_name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-300 italic">—</span>
                                                        )}
                                                    </div>

                                                    {/* Data */}
                                                    <div className="col-span-2 hidden sm:block">
                                                        <span className="text-xs text-gray-400">{student.enrolled_at}</span>
                                                    </div>

                                                    {/* Progresso */}
                                                    <div className="col-span-2 flex justify-center">
                                                        <ProgressBadge pct={student.progress.percentage} />
                                                    </div>

                                                    {/* Aulas + remover */}
                                                    <div className="col-span-1 flex items-center justify-center gap-1.5">
                                                        <span className="text-xs text-gray-500">
                                                            {student.progress.completed}/{student.progress.total}
                                                        </span>
                                                        {isAdmin && (
                                                            <button
                                                                onClick={() => setConfirmRemove(student)}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-500"
                                                                title="Remover aluno"
                                                            >
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-4">

                            {/* Resumo */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Resumo da turma</h3>
                                <div className="space-y-3">
                                    {[
                                        {
                                            label: 'Concluídos',
                                            value: students.filter(s => s.progress.percentage === 100).length,
                                            color: 'text-green-600',
                                        },
                                        {
                                            label: 'Em andamento',
                                            value: students.filter(s => s.progress.percentage > 0 && s.progress.percentage < 100).length,
                                            color: 'text-blue-600',
                                        },
                                        {
                                            label: 'Não iniciados',
                                            value: students.filter(s => s.progress.percentage === 0).length,
                                            color: 'text-gray-400',
                                        },
                                    ].map(item => (
                                        <div key={item.label} className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{item.label}</span>
                                            <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                                        </div>
                                    ))}
                                    <div className="pt-3 border-t border-gray-100">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">Média de progresso</span>
                                            <span className="text-sm font-bold text-gray-900">
                                                {students.length > 0
                                                    ? Math.round(students.reduce((acc, s) => acc + s.progress.percentage, 0) / students.length)
                                                    : 0}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Formulário de matrícula — admin only */}
                            {isAdmin && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Matricular aluno</h3>

                                    {availableStudents.length === 0 ? (
                                        <p className="text-xs text-gray-400">Todos os alunos cadastrados já estão matriculados neste curso.</p>
                                    ) : !turmas || turmas.length === 0 ? (
                                        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                                            <p className="font-semibold mb-1">Nenhuma turma ativa.</p>
                                            <p>Crie ao menos uma turma antes de matricular alunos.</p>
                                            <a href={route('courses.turmas.index', course.slug)} className="mt-2 inline-block text-blue-600 underline font-medium">
                                                Gerenciar turmas →
                                            </a>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleEnroll} className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Aluno *</label>
                                                <select
                                                    value={data.user_id}
                                                    onChange={e => setData('user_id', e.target.value)}
                                                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Selecionar aluno...</option>
                                                    {availableStudents.map(s => (
                                                        <option key={s.id} value={s.id}>{s.name}</option>
                                                    ))}
                                                </select>
                                                {errors.user_id && <p className="text-xs text-red-500">{errors.user_id}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Turma *</label>
                                                <select
                                                    value={data.turma_id}
                                                    onChange={e => setData('turma_id', e.target.value)}
                                                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Selecionar turma...</option>
                                                    {turmas.map(t => (
                                                        <option key={t.id} value={t.id}>{t.name}</option>
                                                    ))}
                                                </select>
                                                {errors.turma_id && <p className="text-xs text-red-500">{errors.turma_id}</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing || !data.user_id || !data.turma_id}
                                                className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                            >
                                                {processing ? 'Matriculando...' : 'Matricular'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* Voltar ao curso */}
                            <Link
                                href={route('courses.show', course.slug)}
                                className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Voltar ao curso
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmação de remoção */}
            {confirmRemove && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 text-center mb-1">Remover aluno?</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            <strong>{confirmRemove.name}</strong> perderá o acesso ao curso e todo o progresso será apagado.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmRemove(null)}
                                className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleRemove(confirmRemove.id)}
                                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
