import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function LessonCreate({ course }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        video_url: '',
        content: '',
        position: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('lessons.store', course.slug));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href={route('courses.index')} className="hover:text-blue-600">Cursos</Link>
                    <span>/</span>
                    <Link href={route('courses.show', course.slug)} className="hover:text-blue-600">{course.title}</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Nova Aula</span>
                </div>
            }
        >
            <Head title="Nova Aula" />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar Nova Aula</h1>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ex: Introdução ao Laravel"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo</label>
                                <input
                                    type="url"
                                    value={data.video_url}
                                    onChange={(e) => setData('video_url', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={6}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Descreva o conteúdo desta aula..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Posição *</label>
                                <input
                                    type="number"
                                    value={data.position}
                                    onChange={(e) => setData('position', parseInt(e.target.value))}
                                    min="0"
                                    className="w-32 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Criando...' : 'Criar Aula'}
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
