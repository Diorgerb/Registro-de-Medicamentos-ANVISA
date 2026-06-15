import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useHashRouter } from '../../router/useHashRouter';

const checkItems = [
  'Análise de deferimentos vs indeferimentos',
  'Filtros por empresa, período e tipo de processo',
  'Gráficos interativos de tendência temporal',
  'Top empresas e categorias de registro',
  'Taxa de aprovação e tempo médio de análise',
];

export function FreeDashboardSection() {
  const { navigate } = useHashRouter();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block px-3 py-1 bg-blue-50 text-brand-navy text-xs font-semibold rounded-full mb-4">
              GRATUITO
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-5">
              Dashboard Analítico Gratuito
            </h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Acesse imediatamente um painel completo com análises de todos os processos de registro de medicamentos na ANVISA dos últimos 10 anos. Sem cadastro, sem custo.
            </p>

            <ul className="space-y-3 mb-10">
              {checkItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => navigate('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-dark transition shadow-lg shadow-brand-navy/20"
            >
              Acessar Dashboard Agora
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right: Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-gray-100 rounded-3xl" />
            <div className="relative rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                {/* Fake browser bar */}
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white rounded text-xs text-gray-400 px-3 py-1 text-center">
                    dprocessos.com/dashboard
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Stat cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                      <div className="text-xs text-green-600 font-medium mb-1">Deferimentos</div>
                      <div className="text-xl font-bold text-green-700"> 1.392</div>
                      <div className="text-xs text-green-500 mt-0.5">75%</div>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                      <div className="text-xs text-red-600 font-medium mb-1">Indeferimentos</div>
                      <div className="text-xl font-bold text-red-700"> 453</div>
                      <div className="text-xs text-red-500 mt-0.5">25%</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">Total</div>
                      <div className="text-xl font-bold text-blue-700">1.845</div>
                      <div className="text-xs text-blue-500 mt-0.5">decisões na última década</div>
                    </div>
                  </div>

                  {/* Chart area */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-xs font-semibold text-gray-600 mb-3">Evolução Mensal</div>
                    <div className="flex items-end gap-1.5 h-16">
                      {[42, 58, 51, 73, 67, 85, 72, 80, 88, 76, 90, 83].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background: `hsl(${217 + i * 2},70%,${50 + (i % 3) * 5}%)`,
                            opacity: 0.75 + i * 0.02,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Fake table rows */}
                  <div className="space-y-2">
                    {[
                      { co: 'EMPRESA A', n: 342, s: 'Deferido', ok: true },
                      { co: 'EMPRESA B', n: 298, s: 'Deferido', ok: true },
                      { co: 'EMPRESA C', n: 187, s: 'Deferido', ok: true },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50">
                        <span className="font-medium text-gray-700 truncate w-32">{row.co}</span>
                        <span className="text-gray-400">{row.n} petições</span>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${row.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {row.s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
