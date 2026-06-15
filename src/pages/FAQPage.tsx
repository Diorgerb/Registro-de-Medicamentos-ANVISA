import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useHashRouter } from '../router/useHashRouter';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQPage() {
  const { navigate } = useHashRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Qual é a finalidade do DPROCESSOS?',
      answer:
        'O DPROCESSOS é uma plataforma voltada à consolidação, organização e consulta estruturada de informações públicas sobre processos de registro de medicamentos na ANVISA. O objetivo é facilitar a visualização, análise e acompanhamento de dados que, muitas vezes, encontram-se dispersos em diferentes consultas e publicações oficiais.',
    },
    {
      question: 'O DPROCESSOS possui vínculo oficial com a ANVISA?',
      answer:
        'Não. O DPROCESSOS é um projeto independente que utiliza exclusivamente informações públicas disponibilizadas pela ANVISA. A plataforma não possui qualquer vínculo institucional com a Agência e não substitui as consultas realizadas diretamente nas fontes oficiais.',
    },
    {
      question: 'Qual é a origem dos dados apresentados?',
      answer:
        'Todos os dados são provenientes de fontes públicas oficiais da ANVISA. O DPROCESSOS atua apenas na consolidação, estruturação e disponibilização dessas informações de forma mais acessível para consulta e análise.',
    },
    {
      question: 'Com que frequência os dados são atualizados?',
      answer:
        'A plataforma executa rotinas periódicas de atualização para incorporar novas publicações, movimentações processuais e alterações disponibilizadas pela ANVISA, mantendo a base o mais atualizada possível.',
    },
    {
      question: 'Quais tipos de processos podem ser consultados?',
      answer:
        'A base contempla processos regulatórios relacionados a petições de registro medicamentos protocolados na última década.',
    },
    {
      question: 'O que significam deferimento e indeferimento?',
      answer:
        'Deferimento significa que uma petição ou solicitação foi aprovada pela ANVISA. Indeferimento significa que a solicitação foi negada. O DPROCESSOS permite acompanhar essas informações de forma consolidada e histórica.',
    },
    {
      question: 'Quais filtros e critérios de busca estão disponíveis?',
      answer:
        'As consultas podem ser realizadas utilizando diferentes critérios disponíveis na plataforma, como número de processo, expediente, empresa, produto e demais informações regulatórias presentes na base de dados.',
    },
    {
      question: 'Posso utilizar os dados em estudos, pesquisas ou relatórios?',
      answer:
        'Sim. Como os dados são públicos, eles podem ser utilizados em pesquisas, análises de mercado, estudos acadêmicos e relatórios corporativos. Recomenda-se citar a ANVISA como fonte primária e o DPROCESSOS como ferramenta de consulta.',
    },
    {
      question: 'É possível exportar informações da plataforma?',
      answer:
        'Funcionalidades de exportação de dados estruturados podem ser disponibilizadas sob demanda.',
    },
    {
      question: 'O DPROCESSOS realiza qualquer alteração nos dados oficiais?',
      answer:
        'Não. O conteúdo disponibilizado corresponde às informações públicas divulgadas pela ANVISA. O DPROCESSOS não altera, complementa ou modifica os dados originais, limitando-se à sua organização e apresentação.',
    },
    {
      question: 'Como posso reportar inconsistências ou sugerir melhorias?',
      answer:
        'Sugestões, correções, solicitações de funcionalidades e eventuais inconsistências podem ser enviadas por meio da página de contato. O feedback dos usuários é fundamental para a evolução contínua da plataforma.',
    },
    {
      question: 'Existe algum custo para utilizar o DPROCESSOS?',
      answer:
        'Não. O acesso ao DPROCESSOS é gratuito. A plataforma foi criada com o objetivo de ampliar a transparência e facilitar o acesso a informações regulatórias públicas.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-brand-navy text-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Perguntas Frequentes
            </h1>

            <p className="text-xl text-blue-100 max-w-3xl">
              Encontre respostas para as dúvidas mais comuns sobre o DPROCESSOS.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-${index}`}
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>

                    <ChevronDown
                      className={`w-5 h-5 text-brand-navy flex-shrink-0 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <div
                      id={`faq-${index}`}
                      className="px-6 py-5 border-t border-gray-100 bg-gray-50"
                    >
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Help */}
            <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Não encontrou sua resposta?
              </h3>

              <p className="text-gray-600 mb-6">
                Caso ainda tenha dúvidas ou queira falar diretamente sobre a
                plataforma, acesse a página de contato.
              </p>

              <button
                onClick={() => navigate('contato')}
                className="px-6 py-3 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-dark transition"
              >
                Entrar em Contato
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}