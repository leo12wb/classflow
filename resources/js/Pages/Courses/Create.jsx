import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CourseCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        workload: '',
        status: 'draft',
        thumbnail: null,
    });

    const [preview, setPreview] = useState(null);

    const handleThumbnail = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData('thumbnail', file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('courses.store'), { forceFormData: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Link href={route('courses.index')} className="hover:text-blue-600 transition-colors">Cursos</Link>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-900 font-medium">Novo Curso</span>
                </div>
            }
        >
            <Head title="Novo Curso" />

            <div className="py-10">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                    {/* Título da página */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Criar novo curso</h1>
                        <p className="text-gray-500 text-sm mt-1">Preencha as informações abaixo para publicar um novo curso na plataforma.</p>
                    </div>

                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Coluna principal */}
                            <div className="lg:col-span-2 space-y-5">

                                {/* Card: Informações básicas */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-5">Informações básicas</h2>

                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Título do curso <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                id="title"
                                                type="text"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="Ex: Laravel 11 para Iniciantes"
                                                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                            />
                                            {errors.title && (
                                                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                    {errors.title}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Descrição
                                            </label>
                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows={5}
                                                placeholder="Descreva o que o aluno vai aprender neste curso..."
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                            />
                                            {errors.description && <p className="mt-1.5 text-xs text-red-500">{errors.description}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Card: Configurações */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-5">Configurações</h2>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="workload" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Carga horária (h) <span className="text-red-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="workload"
                                                    type="number"
                                                    value={data.workload}
                                                    onChange={(e) => setData('workload', e.target.value)}
                                                    min="1"
                                                    placeholder="0"
                                                    className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10 ${errors.workload ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">hrs</span>
                                            </div>
                                            {errors.workload && <p className="mt-1.5 text-xs text-red-500">{errors.workload}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Status <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                id="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                                            >
                                                <option value="draft">Rascunho</option>
                                                <option value="published">Publicado</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Status visual */}
                                    <div className={`mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${data.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                        <span className={`w-2 h-2 rounded-full ${data.status === 'published' ? 'bg-green-500' : 'bg-amber-400'}`} />
                                        {data.status === 'published'
                                            ? 'Este curso ficará visível para todos os alunos ao ser salvo.'
                                            : 'Este curso ficará oculto para alunos até ser publicado.'}
                                    </div>
                                </div>
                            </div>

                            {/* Coluna lateral */}
                            <div className="space-y-5">

                                {/* Card: Imagem de capa */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Imagem de capa</h2>

                                    <label htmlFor="thumbnail" className="block cursor-pointer">
                                        {preview ? (
                                            <div className="relative rounded-xl overflow-hidden aspect-video border border-gray-200">
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-xs font-medium">Trocar imagem</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 transition-colors aspect-video flex flex-col items-center justify-center gap-2 text-gray-400">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-xs text-center px-4">Clique para enviar<br /><span className="text-gray-300">PNG, JPG até 2MB</span></span>
                                            </div>
                                        )}
                                        <input
                                            id="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleThumbnail}
                                            className="hidden"
                                        />
                                    </label>
                                    {errors.thumbnail && <p className="mt-2 text-xs text-red-500">{errors.thumbnail}</p>}
                                </div>

                                {/* Card: Ações */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                </svg>
                                                Criando...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Criar curso
                                            </>
                                        )}
                                    </button>
                                    <Link
                                        href={route('courses.index')}
                                        className="w-full py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                                    >
                                        Cancelar
                                    </Link>
                                </div>

                                {/* Dica */}
                                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                    <p className="text-xs font-semibold text-blue-700 mb-1">💡 Dica</p>
                                    <p className="text-xs text-blue-600 leading-relaxed">
                                        Você pode criar o curso como rascunho agora e adicionar as aulas depois. Publique quando estiver tudo pronto.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
