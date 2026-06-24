import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CourseEdit({ course }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: course.title,
        description: course.description ?? '',
        workload: course.workload,
        status: course.status,
        thumbnail: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('courses.update', course.slug), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href={route('courses.index')} className="hover:text-blue-600">Cursos</Link>
                    <span>/</span>
                    <Link href={route('courses.show', course.slug)} className="hover:text-blue-600">{course.title}</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Editar</span>
                </div>
            }
        >
            <Head title={`Editar: ${course.title}`} />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Curso</h1>

                        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Carga Horária (horas) *</label>
                                    <input
                                        type="number"
                                        value={data.workload}
                                        onChange={(e) => setData('workload', e.target.value)}
                                        min="1"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {errors.workload && <p className="mt-1 text-sm text-red-500">{errors.workload}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="draft">Rascunho</option>
                                        <option value="published">Publicado</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nova Imagem de Capa</label>
                                {course.thumbnail && (
                                    <img src={`/storage/${course.thumbnail}`} alt="Capa atual" className="h-24 rounded-lg object-cover mb-2" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('thumbnail', e.target.files[0])}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                                <Link
                                    href={route('courses.show', course.slug)}
                                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
