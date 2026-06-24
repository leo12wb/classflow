import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CourseTeachers({ course, teachers }) {
    const { data, setData, put, processing } = useForm({
        teacher_ids: teachers.filter((t) => t.assigned).map((t) => t.id),
    });

    const toggle = (id) => {
        setData('teacher_ids', (prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('courses.teachers.update', course.slug));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href={route('courses.index')} className="hover:text-blue-600">Cursos</Link>
                    <span>/</span>
                    <Link href={route('courses.show', course.slug)} className="hover:text-blue-600">{course.title}</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Professores</span>
                </div>
            }
        >
            <Head title={`Professores — ${course.title}`} />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100">
                            <h1 className="text-xl font-bold text-gray-900">Gerenciar Professores</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Selecione os professores que terão acesso para editar e gerenciar as aulas de <strong>{course.title}</strong>.
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            {teachers.length === 0 ? (
                                <div className="px-6 py-12 text-center">
                                    <p className="text-gray-400 text-sm">Nenhum professor cadastrado na plataforma.</p>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-50">
                                    {teachers.map((teacher) => {
                                        const isSelected = data.teacher_ids.includes(teacher.id);
                                        return (
                                            <li key={teacher.id}>
                                                <label className={`flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggle(teacher.id)}
                                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                                    />
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                                            <span className="text-indigo-600 text-sm font-semibold">
                                                                {teacher.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                                                            <p className="text-xs text-gray-400">{teacher.email}</p>
                                                        </div>
                                                    </div>
                                                    {isSelected && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                            Atribuído
                                                        </span>
                                                    )}
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}

                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                                <p className="text-sm text-gray-500">
                                    {data.teacher_ids.length} professor(es) selecionado(s)
                                </p>
                                <div className="flex gap-3">
                                    <Link
                                        href={route('courses.show', course.slug)}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition-colors"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing || teachers.length === 0}
                                        className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                    >
                                        {processing ? 'Salvando...' : 'Salvar'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
