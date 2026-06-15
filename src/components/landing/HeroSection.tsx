import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useHashRouter } from '../../router/useHashRouter';

export function HeroSection() {
  const { navigate } = useHashRouter();

  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-navy-light opacity-40 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-600 opacity-20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6">
              <Zap size={14} className="text-yellow-300" />
              Dados públicos ANVISA, gratuito e sem cadastro
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Petições de registro de medicamentos
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed mb-10">
              Acesse e analise dados oficiais de petições de registro de medicamentos na ANVISA. Dados de deferimentos, indeferimentos, tendências e empresas, tudo em um só lugar, sem custo.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => navigate('dashboard')}
                className="px-6 py-3 bg-white text-brand-navy font-semibold rounded-xl hover:bg-blue-50 transition flex items-center gap-2 shadow-lg shadow-white/10"
              >
                Explorar os Dados
                <ArrowRight size={18} />
              </button>
              <a
                href="#features"
                className="px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition flex items-center gap-2"
              >
                Saiba Mais
              </a>
            </div>

            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-3xl font-bold">12.000+</div>
                <div className="text-sm text-blue-200 mt-1">Petições na base</div>
              </div>
              <div className="border-l border-white/20 pl-8">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-blue-200 mt-1">Dados públicos</div>
              </div>
              <div className="border-l border-white/20 pl-8">
                <div className="text-3xl font-bold">Grátis</div>
                <div className="text-sm text-blue-200 mt-1">Sem cadastro</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/30 to-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/5 border border-white/15 rounded-2xl p-7 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="h-3 w-36 bg-white/30 rounded mb-2" />
                    <div className="h-2 w-24 bg-white/15 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                      <div className="h-2 w-12 bg-green-400/60 rounded" />
                    </div>
                    <div className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full">
                      <div className="h-2 w-10 bg-red-400/60 rounded" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Deferimentos', val: '8.247', color: 'bg-green-500', pct: '67%' },
                    { label: 'Indeferimentos', val: '4.073', color: 'bg-orange-500', pct: '33%' },
                    { label: 'Total', val: '12.320', color: 'bg-blue-500', pct: '' },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/8 rounded-xl p-4 border border-white/10">
                      <div className={`w-8 h-1.5 ${item.color} rounded mb-2`} />
                      <div className="text-xl font-bold">{item.val}</div>
                      <div className="text-xs text-blue-200 mt-1">{item.label}</div>
                      {item.pct && <div className="text-xs text-white/50 mt-0.5">{item.pct} do total</div>}
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="h-2 w-40 bg-white/20 rounded mb-4" />
                  <div className="flex items-end gap-2 h-20">
                    {[45, 65, 55, 80, 70, 90, 75, 85].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          background: i % 2 === 0
                            ? 'rgba(59,130,246,0.6)'
                            : 'rgba(34,197,94,0.5)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-green-300">
                  <ShieldCheck size={14} />
                  Dados atualizados via Consultas ANVISA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-50" style={{
        clipPath: 'ellipse(100% 100% at 50% 100%)'
      }} />
    </section>
  );
}
