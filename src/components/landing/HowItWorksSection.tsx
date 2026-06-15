import { useHashRouter } from '../../router/useHashRouter';

const steps = [
  {
    n: '01',
    title: 'Acesse o Dashboard',
    desc: 'Clique em "Explorar os Dados" e tenha acesso imediato a todos os registros de petições ANVISA dos últimos 10 anos.',
  },
  {
    n: '02',
    title: 'Filtre e Explore',
    desc: 'Use os filtros para encontrar empresa, tipo de processo ou período específico. Os gráficos se atualizam em tempo real.',
  },
  {
    n: '03',
    title: 'Analise as Tendências',
    desc: 'Visualize gráficos de evolução temporal, compare períodos e identifique padrões nos deferimentos e indeferimentos.',
  },
];

export function HowItWorksSection() {
  const { navigate } = useHashRouter();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Como usar</h2>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">Simples, gratuito e sem burocracia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-brand-navy rounded-full group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-white">{step.n}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Data transparency note */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Dados públicos, acesso livre</h3>
          <p className="text-gray-500 mb-5 max-w-2xl mx-auto leading-relaxed">
            Todos os dados exibidos são públicos e provenientes da ANVISA. Nenhuma informação é estimada ou inventada. O DPROCESSOS apenas organiza e apresenta esses dados de forma acessível.
          </p>
          <button
            onClick={() => navigate('dashboard')}
            className="text-brand-navy font-semibold hover:underline transition"
          >
            Explorar os dados agora →
          </button>
        </div>
      </div>
    </section>
  );
}
