import { BarChart3, Clock, Globe, Search, Shield, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Dados Reais da ANVISA',
    description: 'Acesso direto aos dados oficiais de petições de registro de medicamentos — sem intermediários.',
  },
  {
    icon: Clock,
    title: 'Atualizado Regularmente',
    description: 'Base de dados mantida atualizada com novos deferimentos e indeferimentos ao longo do tempo.',
  },
  {
    icon: Globe,
    title: 'Acesso 100% Gratuito',
    description: 'O dashboard analítico é completamente gratuito e aberto ao público, sem necessidade de cadastro.',
  },
  {
    icon: Search,
    title: 'Filtros Avançados',
    description: 'Filtre por empresa, período, tipo de processo e situação para encontrar exatamente o que precisa.',
  },
  {
    icon: TrendingUp,
    title: 'Análise de Tendências',
    description: 'Visualize gráficos de evolução temporal, tendências e comparações entre períodos.',
  },
  {
    icon: Shield,
    title: 'Dados Confiáveis',
    description: 'Todas as informações são obtidas diretamente da fonte oficial — Agência Nacional de Vigilância Sanitária.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que usar o DPROCESSOS?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Tudo que você precisa para acompanhar processos de registro de medicamentos na ANVISA
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 bg-brand-navy/8 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="text-brand-navy" size={22} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
