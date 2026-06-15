import { useHashRouter, Page } from '../../router/useHashRouter';

export function Footer() {
  const { navigate } = useHashRouter();

  const link = (to: Page, label: string) => (
    <li>
      <button
        onClick={() => navigate(to)}
        className="hover:text-white transition text-left"
      >
        {label}
      </button>
    </li>
  );

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <img src="/logoDBPROCESSOS1.png" alt="DPROCESSOS" className="h-7 mb-3" />
            <p className="text-sm">Extração, tratamento e análise de dados públicos disponibilizados pela ANVISA sobre petições de registro de medicamentos (deferimentos e indeferimentos).</p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              {link('home', 'Início')}
              {link('dashboard', 'Dashboard')}
              {link('sobre', 'Sobre')}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Ajuda</h4>
            <ul className="space-y-2 text-sm">
              {link('faq', 'FAQ')}
              {link('contato', 'Contato')}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Fonte dos Dados</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.gov.br/anvisa/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  ANVISA Oficial
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p>© 2026 DPROCESSOS. Dados oficiais obtidos via ANVISA.</p>
          <p>
            Made with care by{' '}
            <a
              href="https://diorgerb.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition"
            >
              Diórger B.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
