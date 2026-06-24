import { Head, Link } from '@inertiajs/react';

const featureItems = [
    { icon: '🎓', title: 'Cursos estruturados', desc: 'Aulas organizadas por ordem, com conteúdo e vídeo.' },
    { icon: '📊', title: 'Progresso por aula', desc: 'O aluno marca cada aula e acompanha o percentual.' },
    { icon: '📄', title: 'Certificado PDF', desc: 'Emitido automaticamente ao concluir 100% do curso.' },
    { icon: '👨‍🏫', title: 'Múltiplos professores', desc: 'Atribua N professores a cada curso via painel admin.' },
    { icon: '🔐', title: 'Controle de acesso', desc: 'Três perfis: Aluno, Professor e Administrador.' },
    { icon: '📋', title: 'Dashboard por papel', desc: 'Cada usuário vê exatamente o que precisa ao entrar.' },
    { icon: '📱', title: 'Design responsivo', desc: 'Funciona em celular, tablet e desktop.' },
    { icon: '🔒', title: 'Autenticação segura', desc: 'Login, registro e recuperação de senha inclusos.' },
];

export default function Welcome() {
    return (
        <>
            <Head title="Mini-EAD — Plataforma de Cursos Online" />
            <div className="min-h-screen bg-white text-gray-900 antialiased">

                {/* ── Nav ─────────────────────────────────────── */}
                <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="font-bold text-gray-900 text-lg">Mini-EAD</span>
                        </div>

                        {/* Links centrais */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                            <a href="#solucoes" className="hover:text-gray-900 transition-colors">Soluções</a>
                            <a href="#funcionalidades" className="hover:text-gray-900 transition-colors">Funcionalidades</a>
                            <a href="#perfis" className="hover:text-gray-900 transition-colors">Perfis</a>
                            <Link href="/login" className="hover:text-gray-900 transition-colors">Entrar</Link>
                        </nav>

                        {/* CTA */}
                        <Link
                            href="/register"
                            className="text-sm font-semibold bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            Criar conta gratuita
                        </Link>
                    </div>
                </header>

                {/* ── Hero ────────────────────────────────────── */}
                <section className="pt-44 pb-20 px-6 text-center bg-white">
                    <div className="max-w-4xl mx-auto">

                        {/* Badge pill — igual ao do site */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-10">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l1.5 1.5M12 2v2M19 3l-1.5 1.5M3 12H1M23 12h-2M19 21l-1.5-1.5M12 22v-2M5 21l1.5-1.5M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
                            </svg>
                            Plataforma de aprendizado online
                        </div>

                        {/* H1 grande com parte colorida — igual ao site */}
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-7">
                            Hospede, gerencie e{' '}
                            <span className="text-blue-600">ensine seus cursos</span>{' '}
                            com autonomia total.
                        </h1>

                        {/* Subtítulo */}
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Crie cursos, acompanhe o progresso dos alunos e emita certificados PDF — tudo na sua própria plataforma, com controle e dados confiáveis.
                        </p>

                        {/* CTAs — pill grande como no site */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                            >
                                Criar conta gratuita
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href="#solucoes"
                                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-semibold text-base hover:bg-gray-50 transition-colors"
                            >
                                Conhecer soluções
                            </Link>
                        </div>

                        {/* Destaques da plataforma */}
                        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-8">
                            {['Cursos gratuitos', 'Progresso por aula', 'Certificado PDF', 'Múltiplos professores', 'Acesso imediato'].map((item) => (
                                <span key={item} className="text-gray-300 font-semibold text-sm tracking-wide uppercase">
                                    {item}
                                </span>
                            ))}
                        </div>

                        {/* Stats linha — igual ao site */}
                        <div className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            3 cursos publicados · 15 aulas disponíveis · Certificado PDF automático
                        </div>
                    </div>
                </section>

                {/* ── Soluções ────────────────────────────────── */}
                <section id="solucoes" className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Para quem é o Mini-EAD?</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">A plataforma atende dois públicos principais com experiências distintas.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Card Aluno */}
                            <div className="relative rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/40 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
                                <div className="relative">
                                    <span className="inline-block text-3xl mb-4">🎓</span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Para Alunos</h3>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                        Matricule-se em cursos gratuitos, acompanhe seu progresso aula a aula e receba seu certificado PDF ao concluir.
                                    </p>
                                    <ul className="space-y-2 mb-8">
                                        {['Acesso imediato após matrícula', 'Barra de progresso em tempo real', 'Certificado emitido automaticamente', 'Dashboard personalizado'].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/register" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                        Criar conta de aluno →
                                    </Link>
                                </div>
                            </div>

                            {/* Card Professor/Admin */}
                            <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-100/30 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
                                <div className="relative">
                                    <span className="inline-block text-3xl mb-4">🏫</span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Para Professores e Admins</h3>
                                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                        Crie cursos, adicione aulas, gerencie professores e acompanhe métricas de toda a plataforma com controle total.
                                    </p>
                                    <ul className="space-y-2 mb-8">
                                        {['Criação e edição de cursos', 'Atribuição de professores por curso', 'Relatórios de matrículas e progresso', 'Gestão completa de usuários'].map((item) => (
                                            <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                                                <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                        Acessar painel →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Dashboard destaque ──────────────────────── */}
                <section className="py-24 px-6 bg-blue-600">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Tudo que o aluno precisa em um dashboard
                        </h2>
                        <p className="text-blue-100 text-lg leading-relaxed mb-10">
                            Ao entrar, cada usuário vê exatamente o que importa: cursos matriculados, progresso por aula, certificados disponíveis e atalhos para as próximas aulas.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { icon: '📊', text: 'Progresso calculado aula a aula em tempo real' },
                                { icon: '🏆', text: 'Certificados disponíveis assim que atingir 100%' },
                                { icon: '🔔', text: 'Visão clara de cursos em andamento e concluídos' },
                            ].map((item) => (
                                <div key={item.text} className="bg-blue-500/40 rounded-2xl p-5 flex flex-col items-center gap-3 text-center">
                                    <span className="text-3xl">{item.icon}</span>
                                    <p className="text-blue-100 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Funcionalidades ─────────────────────────── */}
                <section id="funcionalidades" className="py-24 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">Funcionalidades</span>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">8 recursos em um só lugar</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">Tudo o que uma plataforma EAD precisa para oferecer uma experiência de aprendizado completa.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {featureItems.map((f) => (
                                <div key={f.title} className="group p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all bg-white">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl mb-4 group-hover:bg-blue-600 transition-colors group-hover:scale-110 duration-200">
                                        <span className="group-hover:grayscale-0">{f.icon}</span>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{f.title}</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Perfis ──────────────────────────────────── */}
                <section id="perfis" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mb-4">Perfis de acesso</span>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Três perfis, uma plataforma</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">Cada usuário entra e vê um dashboard personalizado ao seu papel.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    emoji: '🎓',
                                    role: 'Aluno',
                                    desc: 'Explora cursos, se matricula, acompanha o progresso e recebe certificados.',
                                    perks: ['Matrícula em 1 clique', 'Progresso aula por aula', 'Certificado PDF automático', 'Dashboard de evolução'],
                                    accent: 'blue',
                                },
                                {
                                    emoji: '👨‍🏫',
                                    role: 'Professor',
                                    desc: 'Cria e edita cursos, gerencia aulas e acompanha alunos matriculados.',
                                    perks: ['Criação de cursos e aulas', 'Acesso a cursos atribuídos', 'Métricas de alunos', 'Dashboard de gestão'],
                                    accent: 'indigo',
                                },
                                {
                                    emoji: '⚙️',
                                    role: 'Administrador',
                                    desc: 'Controle total: plataforma, usuários, cursos e atribuição de professores.',
                                    perks: ['Visão geral da plataforma', 'Atribuição de professores', 'Gestão de todos os cursos', 'Métricas globais'],
                                    accent: 'purple',
                                },
                            ].map((r) => {
                                const colors = {
                                    blue: { border: 'border-blue-200', bg: 'bg-blue-600', light: 'bg-blue-50', tick: 'text-blue-500', tag: 'bg-blue-100 text-blue-700' },
                                    indigo: { border: 'border-indigo-200', bg: 'bg-indigo-600', light: 'bg-indigo-50', tick: 'text-indigo-500', tag: 'bg-indigo-100 text-indigo-700' },
                                    purple: { border: 'border-purple-200', bg: 'bg-purple-600', light: 'bg-purple-50', tick: 'text-purple-500', tag: 'bg-purple-100 text-purple-700' },
                                };
                                const c = colors[r.accent];
                                return (
                                    <div key={r.role} className={`bg-white rounded-2xl border ${c.border} p-6 hover:shadow-lg transition-shadow`}>
                                        <div className={`w-12 h-12 rounded-2xl ${c.light} flex items-center justify-center text-2xl mb-5`}>
                                            {r.emoji}
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <h3 className="text-lg font-bold text-gray-900">{r.role}</h3>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.tag}`}>{r.role}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-5 leading-relaxed">{r.desc}</p>
                                        <ul className="space-y-2">
                                            {r.perks.map((p) => (
                                                <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <svg className={`w-4 h-4 flex-shrink-0 ${c.tick}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {p}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── CTA final ───────────────────────────────── */}
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                            Comece a aprender hoje mesmo
                        </h2>
                        <p className="text-gray-500 text-lg mb-10">
                            Crie sua conta gratuitamente, acesse os cursos disponíveis e receba seu certificado ao concluir.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors text-base shadow-lg shadow-blue-100"
                            >
                                Criar conta gratuita
                            </Link>
                            <Link
                                href="/login"
                                className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base"
                            >
                                Já tenho conta
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── Footer ──────────────────────────────────── */}
                <footer className="bg-gray-950 text-gray-400 py-12 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <span className="text-white font-bold text-lg">Mini-EAD</span>
                                </div>
                                <p className="text-sm leading-relaxed max-w-xs">
                                    Aprenda com especialistas, evolua no seu ritmo e conquiste seu certificado ao concluir cada curso.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-white text-sm font-semibold mb-4">Plataforma</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/login" className="hover:text-white transition-colors">Entrar</Link></li>
                                    <li><Link href="/register" className="hover:text-white transition-colors">Criar conta</Link></li>
                                    <li><Link href="/courses" className="hover:text-white transition-colors">Cursos disponíveis</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                            <p>&copy; {new Date().getFullYear()} Mini-EAD — Todos os direitos reservados.</p>
                            <p>Aprenda no seu ritmo. Conquiste seu certificado.</p>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
