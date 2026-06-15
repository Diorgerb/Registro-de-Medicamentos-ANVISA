import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useHashRouter } from '../router/useHashRouter';
import { Database, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export function SobrePage() {
  const { navigate } = useHashRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-brand-navy text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <img src="/logoDBPROCESSOS1.png" alt="DPROCESSOS" className="h-20 mx-auto mb-8" />
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Uma plataforma aberta de consulta a dados públicos sobre processos de registro de medicamentos protocolados na ANVISA na última década.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center">
                <Heart className="text-brand-navy" size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">O que é o DPROCESSOS?</h2>
                <p className="text-gray-500 leading-relaxed">
                  O DPROCESSOS é um projeto de transparência e acesso à informação. Coletamos e organizamos dados públicos disponibilizados pela ANVISA sobre petições de registro de medicamentos (somente resultados de deferimentos e indeferimentos) e os apresentamos de forma clara e acessível, sem custo algum.
                </p>
                <p className="text-gray-500 leading-relaxed mt-3">
                  A ideia surgiu da dificuldade de acompanhar sistematicamente o andamento de processos regulatórios no portal da ANVISA. O DPROCESSOS centraliza essas informações em um dashboard analítico intuitivo.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center">
                <Database className="text-brand-navy" size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">De onde vêm os dados?</h2>
                <p className="text-gray-500 leading-relaxed">
                  Todos os dados exibidos no DPROCESSOS são públicos e provenientes da ANVISA, com base nos registros oficiais disponibilizados pelo órgão regulador.
                </p>
                <p className="text-gray-500 leading-relaxed mt-3">
                  A base de dados é atualizada periodicamente conforme novos registros são publicados pela ANVISA.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-brand-navy" size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Compromisso com transparência</h2>
                <p className="text-gray-500 leading-relaxed">
                  O DPROCESSOS não vende dados, não restringe o acesso e não exige cadastro para consulta.
                </p>
                <p className="text-gray-500 leading-relaxed mt-3">
                  O código é desenvolvido com foco em transparência e usabilidade. Feedbacks e contribuições são sempre bem-vindos.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
              <p className="text-gray-500 mb-6">
                Tem dúvidas, sugestões ou quer contribuir com o projeto?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('dashboard')}
                  className="px-6 py-3 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-dark transition flex items-center justify-center gap-2"
                >
                  Explorar os Dados
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('contato')}
                  className="px-6 py-3 border-2 border-brand-navy text-brand-navy font-semibold rounded-xl hover:bg-brand-navy/5 transition"
                >
                  Entrar em Contato
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
