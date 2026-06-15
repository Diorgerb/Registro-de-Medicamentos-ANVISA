import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useHashRouter, Page } from '../../router/useHashRouter';

const NAV_LINKS: { label: string; to: Page }[] = [
  { label: 'Home', to: 'home' },
  { label: 'Dashboard Registros Publicados', to: 'dashboard' },
  { label: 'Sobre', to: 'sobre' },
  { label: 'FAQ', to: 'faq' },
  { label: 'Contato', to: 'contato' },
];

const ACTIVE_LINK_STYLE = 'bg-white/15 text-white';
const INACTIVE_LINK_STYLE = 'text-white/75 hover:text-white hover:bg-white/10';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { page, navigate } = useHashRouter();

  return (
    <nav className="sticky top-0 z-40 bg-brand-navy shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate('home')} className="hover:opacity-80 transition flex-shrink-0">
          <img src="/logoDBPROCESSOS1.png" alt="DPROCESSOS" className="h-9" />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.filter(l => l.to !== 'dashboard').map(link => (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                page === link.to ? ACTIVE_LINK_STYLE : INACTIVE_LINK_STYLE
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate('dashboard')}
            className={`ml-3 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              page === 'dashboard'
                ? 'bg-white text-brand-navy'
                : 'bg-white/90 text-brand-navy hover:bg-white'
            }`}
          >
            Dashboard
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-navy-dark border-t border-white/10 px-4 py-3 space-y-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.to}
              onClick={() => { navigate(link.to); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                page === link.to ? ACTIVE_LINK_STYLE : INACTIVE_LINK_STYLE
              } ${link.to === 'dashboard' ? 'mt-1 bg-white/10 text-white font-semibold' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
