import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CertificatesIndex({ certificates }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Meus Certificados</h2>
                    <p className="text-sm text-gray-500 mt-1">{certificates.length} certificado(s) emitido(s)</p>
                </div>
            }
        >
            <Head title="Certificados" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {certificates.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-16 text-center">
                            <div className="text-6xl mb-4">🎓</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum certificado ainda</h3>
                            <p className="text-sm text-gray-500 mb-6">Conclua um curso para receber seu certificado.</p>
                            <Link
                                href={route('courses.index')}
                                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Explorar Cursos
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {certificates.map((cert) => (
                                <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white text-center">
                                        <div className="text-4xl mb-2">🏆</div>
                                        <p className="text-xs text-blue-200 uppercase tracking-widest">Certificado de Conclusão</p>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-semibold text-gray-900 mb-1">{cert.course.title}</h3>
                                        <p className="text-xs text-gray-400 mb-4">⏱ {cert.course.workload}h de conteúdo</p>

                                        <div className="space-y-1 mb-5">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400">Código</span>
                                                <span className="font-mono font-medium text-gray-700">{cert.certificate_code}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-400">Emitido em</span>
                                                <span className="text-gray-700">{cert.issued_at}</span>
                                            </div>
                                        </div>

                                        <a
                                            href={route('certificates.download', cert.id)}
                                            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            ⬇ Baixar PDF
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
