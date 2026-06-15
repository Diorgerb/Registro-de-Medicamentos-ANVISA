import { useState, useEffect } from 'react';

export type Page = 'home' | 'dashboard' | 'sobre' | 'faq' | 'contato';

export interface Router {
  page: Page;
  navigate: (to: Page) => void;
}

const ROUTE_MAP: Record<string, Page> = {
  '#/dashboard': 'dashboard',
  '#/sobre': 'sobre',
  '#/faq': 'faq',
  '#/contato': 'contato',
};

function getPageFromHash(hash: string): Page {
  return ROUTE_MAP[hash] ?? 'home';
}

export function useHashRouter(): Router {
  const [page, setPage] = useState<Page>(() => getPageFromHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (to: Page) => {
    const paths: Record<Page, string> = {
      home: '#/',
      dashboard: '#/dashboard',
      sobre: '#/sobre',
      faq: '#/faq',
      contato: '#/contato',
    };
    window.location.hash = paths[to];
    window.scrollTo(0, 0);
  };

  return { page, navigate };
}
