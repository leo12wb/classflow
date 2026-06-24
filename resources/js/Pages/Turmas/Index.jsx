import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                       */
/* ------------------------------------------------------------------ */

function ProgressBar({ pct }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all ${pct === 100 ? 'bg-green-500' : pct > 0 ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
            <span className={`text-xs font-bold w-8 text-right ${pct === 100 ? 'text-green-600' : pct > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                {pct}%
            </span>
        </div>
    );
}

function Avatar({ name }) {
    const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    return (
        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {initials}
        </div>
    );
}

function TurmaForm({ onSubmit, onCancel, initial = {}, processing }) {
    const { data, setData, errors } = useForm({
        name: initial.name ?? '',
        description: initial.description ?? '',
        max_students: initial.max_students ?? '',
        status: initial.status ?? 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        onSubmit(data);
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Nome *</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Turma A — 2026"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Descrição</label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Opcional"
                />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Vagas</label>
                    <input
                        type="number"
                        min="1"
                        value={data.max_students}
                        onChange={e => setData('max_students', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ilimitado"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                    <select
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="active">Ativa</option>
                        <option value="closed">Encerrada</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700">
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
                >
                    {processing ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
}

/* ------------------------------------------------------------------ */
/*  Students panel                                                       */
/* ------------------------------------------------------------------ */

function StudentsPanel({ turma }) {
    const students = turma.students ?? [];
    const avg = students.length
        ? Math.round(students.reduce((sum, s) => sum + s.progress.percentage, 0) / students.length)
        : 0;
    const concluded = students.filter(s => s.progress.percentage === 100).length;
    const inProgress = students.filter(s => s.progress.percentage > 0 && s.progress.percentage < 100).length;
    const notStarted = students.filter(s => s.progress.percentage === 0).length;

    return (
        <div className="flex flex-col h-full">
            {/* Turma header */}
            <div className="px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-gray-900">{turma.name}</h2>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${turma.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {turma.status === 'active' ? 'Ativa' : 'Encerrada'}
                    </span>
                </div>
                {turma.description && <p className="text-sm text-gray-500">{turma.description}</p>}

                {/* Stats strip */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                    {[
                        { label: 'Alunos', value: students.length, color: 'text-gray-900' },
                        { label: 'Concluídos', value: concluded, color: 'text-green-600' },
                        { label: 'Em andamento', value: inProgress, color: 'text-blue-600' },
                        { label: 'Média geral', value: `${avg}%`, color: avg >= 70 ? 'text-green-600' : avg >= 40 ? 'text-amber-600' : 'text-gray-500' },
                    ].map(s => (
                        <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                            <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Students list */}
            <div className="flex-1 overflow-y-auto">
                {students.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Nenhum aluno nesta turma</p>
                        <p className="text-xs text-gray-400 mt-1">Matricule alunos na página de alunos do curso.</p>
                    </div>
                ) : (
                    <>
                        {/* Table header */}
                        <div className="grid grid-cols-12 px-6 py-2.5 bg-gray-50/60 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide sticky top-0">
                            <div className="col-span-5">Aluno</div>
                            <div className="col-span-3 text-center">Desempenho</div>
                            <div className="col-span-2 text-center">Aulas</div>
                            <div className="col-span-2 text-right">Matrícula</div>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {students.map(student => (
                                <div key={student.id} className="grid grid-cols-12 items-center px-6 py-3.5 hover:bg-gray-50/50 transition-colors">
                                    {/* Avatar + nome */}
                                    <div className="col-span-5 flex items-center gap-3">
                                        <Avatar name={student.name} />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{student.email}</p>
                                        </div>
                                    </div>

                                    {/* Barra de progresso */}
                                    <div className="col-span-3 px-2">
                                        <ProgressBar pct={student.progress.percentage} />
                                    </div>

                                    {/* Aulas concluídas */}
                                    <div className="col-span-2 text-center">
                                        <span className="text-xs font-semibold text-gray-700">
                                            {student.progress.completed}
                                            <span className="text-gray-300 font-normal">/{student.progress.total}</span>
                                        </span>
                                    </div>

                                    {/* Data de matrícula */}
                                    <div className="col-span-2 text-right">
                                        <span className="text-xs text-gray-400">{student.enrolled_at}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                            */
/* ------------------------------------------------------------------ */

export default function TurmasIndex({ course, turmas: initialTurmas }) {
    const [turmas, setTurmas] = useState(initialTurmas);
    const [selectedId, setSelectedId] = useState(initialTurmas[0]?.id ?? null);
    const [showCreate, setShowCreate] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [formProcessing, setFormProcessing] = useState(false);

    const selected = turmas.find(t => t.id === selectedId) ?? null;

    const handleCreate = (data) => {
        setFormProcessing(true);
        router.post(route('courses.turmas.store', course.slug), data, {
            onSuccess: () => { setShowCreate(false); setFormProcessing(false); },
            onError: () => setFormProcessing(false),
            preserveScroll: true,
        });
    };

    const handleUpdate = (turma, data) => {
        setFormProcessing(true);
        router.put(route('courses.turmas.update', { course: course.slug, turma: turma.id }), data, {
            onSuccess: () => { setEditingId(null); setFormProcessing(false); },
            onError: () => setFormProcessing(false),
            preserveScroll: true,
        });
    };

    const handleDelete = (turma) => {
        router.delete(route('courses.turmas.destroy', { course: course.slug, turma: turma.id }), {
            onSuccess: () => {
                setDeletingId(null);
                if (selectedId === turma.id) setSelectedId(null);
            },
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href={route('courses.index')} className="hover:text-blue-600">Cursos</Link>
                    <span>/</span>
                    <Link href={route('courses.show', course.slug)} className="hover:text-blue-600">{course.title}</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Turmas</span>
                </div>
            }
        >
            <Head title={`Turmas — ${course.title}`} />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    {/* Page title + actions */}
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Turmas</h1>
                            <p className="text-sm text-gray-500 mt-0.5">{turmas.length} turma(s) · {course.title}</p>
                        </div>
                        <button
                            onClick={() => { setShowCreate(true); setEditingId(null); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nova Turma
                        </button>
                    </div>

                    {/* Create form */}
                    {showCreate && (
                        <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-5 mb-5">
                            <h2 className="text-sm font-semibold text-gray-800 mb-4">Nova Turma</h2>
                            <TurmaForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} processing={formProcessing} />
                        </div>
                    )}

                    {turmas.length === 0 && !showCreate ? (
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-20 text-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <p className="text-gray-600 font-medium">Nenhuma turma cadastrada.</p>
                            <p className="text-gray-400 text-sm mt-1">Crie turmas para organizar e acompanhar seus alunos.</p>
                        </div>
                    ) : (
                        /* Split layout */
                        <div className="flex gap-5" style={{ minHeight: '600px' }}>

                            {/* Left: turmas list */}
                            <div className="w-64 flex-shrink-0 space-y-2">
                                {turmas.map(turma => (
                                    <div key={turma.id}>
                                        {editingId === turma.id ? (
                                            <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-4">
                                                <TurmaForm
                                                    initial={turma}
                                                    onSubmit={(data) => handleUpdate(turma, data)}
                                                    onCancel={() => setEditingId(null)}
                                                    processing={formProcessing}
                                                />
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => { setSelectedId(turma.id); setEditingId(null); }}
                                                className={`w-full text-left rounded-xl border px-4 py-3.5 transition-all group ${selectedId === turma.id
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                    : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="min-w-0 flex-1">
                                                        <p className={`font-semibold text-sm truncate ${selectedId === turma.id ? 'text-white' : 'text-gray-900'}`}>
                                                            {turma.name}
                                                        </p>
                                                        <p className={`text-xs mt-0.5 ${selectedId === turma.id ? 'text-blue-100' : 'text-gray-400'}`}>
                                                            {turma.enrollments_count} aluno(s)
                                                            {turma.max_students ? ` · máx ${turma.max_students}` : ''}
                                                        </p>
                                                    </div>
                                                    <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium ${
                                                        selectedId === turma.id
                                                            ? turma.status === 'active' ? 'bg-white/20 text-white' : 'bg-white/10 text-blue-200'
                                                            : turma.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                        {turma.status === 'active' ? 'Ativa' : 'Encerrada'}
                                                    </span>
                                                </div>

                                                {/* Edit/Delete buttons — show on hover or selected */}
                                                <div className={`flex gap-2 mt-2.5 pt-2.5 border-t ${selectedId === turma.id ? 'border-white/20' : 'border-gray-100'}`}>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setEditingId(turma.id); setSelectedId(turma.id); }}
                                                        className={`text-xs px-2 py-1 rounded-lg transition-colors ${selectedId === turma.id ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                                    >
                                                        Editar
                                                    </button>
                                                    {deletingId === turma.id ? (
                                                        <>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleDelete(turma); }}
                                                                className="text-xs px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                                                            >
                                                                Confirmar
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setDeletingId(null); }}
                                                                className={`text-xs px-2 py-1 rounded-lg transition-colors ${selectedId === turma.id ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setDeletingId(turma.id); }}
                                                            className={`text-xs px-2 py-1 rounded-lg transition-colors ${selectedId === turma.id ? 'bg-white/20 text-red-200 hover:bg-red-500/30' : 'bg-gray-100 text-red-400 hover:bg-red-50'}`}
                                                        >
                                                            Remover
                                                        </button>
                                                    )}
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Right: selected turma detail */}
                            <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                {selected ? (
                                    <StudentsPanel turma={selected} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-20 text-center px-6">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 font-medium">Selecione uma turma</p>
                                        <p className="text-xs text-gray-400 mt-1">Clique em uma turma à esquerda para ver os alunos.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-5">
                        <Link href={route('courses.show', course.slug)} className="text-sm text-gray-500 hover:text-blue-600 inline-flex items-center gap-1">
                            ← Voltar ao curso
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
