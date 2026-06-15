import { useHashRouter } from './router/useHashRouter';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SobrePage } from './pages/SobrePage';
import { FAQPage } from './pages/FAQPage';
import { ContatoPage } from './pages/ContatoPage';

function App() {
  const { page } = useHashRouter();

  switch (page) {
    case 'dashboard': return <DashboardPage />;
    case 'sobre':     return <SobrePage />;
    case 'faq':       return <FAQPage />;
    case 'contato':   return <ContatoPage />;
    default:          return <LandingPage />;
  }
}

export default App;
