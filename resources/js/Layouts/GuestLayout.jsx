import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex">
            {/* Painel esquerdo — azul */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-lg">Mini-EAD</span>
                </Link>

                <div>
                    <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
                        Aprenda no seu ritmo,<br />conquiste seu certificado.
                    </h2>
                    <ul className="space-y-4">
                        {[
                            'Acesso imediato após o cadastro',
                            'Progresso acompanhado aula por aula',
                            'Certificado PDF emitido automaticamente',
                            'Professores especialistas em cada curso',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-blue-100">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-blue-200 text-xs">
                    &copy; {new Date().getFullYear()} Mini-EAD — Todos os direitos reservados.
                </p>
            </div>

            {/* Painel direito — formulário */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
                {/* Logo mobile */}
                <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="font-bold text-gray-900 text-lg">Mini-EAD</span>
                </Link>

                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
