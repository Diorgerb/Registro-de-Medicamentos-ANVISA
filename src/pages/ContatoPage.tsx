import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-brand-navy text-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Fale Conosco
            </h1>

            <p className="text-xl text-blue-100 max-w-3xl">
              Dúvidas, sugestões ou feedback sobre o DPROCESSOS?
              Entre em contato por um dos canais abaixo.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

              {/* Email */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                <Mail className="w-8 h-8 text-brand-navy mx-auto mb-4" />

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  E-mail
                </h3>

                <p className="text-gray-500 mb-4">
                  Canal direto para contato
                </p>

                <a
                  href="mailto:diorgerb@gmail.com"
                  className="text-brand-navy hover:underline font-medium break-all"
                >
                  diorgerb@gmail.com
                </a>
              </div>

              {/* Telefone */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                <Phone className="w-8 h-8 text-brand-navy mx-auto mb-4" />

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Telefone
                </h3>

                <p className="text-gray-500 mb-4">
                  Contato direto
                </p>

                <a
                  href="tel:+5531997722268"
                  className="text-brand-navy hover:underline font-medium"
                >
                  (31) 99772-2268
                </a>
              </div>

              {/* LinkedIn */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                <Linkedin className="w-8 h-8 text-brand-navy mx-auto mb-4" />

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  LinkedIn
                </h3>

                <p className="text-gray-500 mb-4">
                  Conexão profissional
                </p>

                <a
                  href="https://www.linkedin.com/in/diorgerbretas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-navy hover:underline font-medium break-all"
                >
                  linkedin.com/in/diorgerbretas
                </a>
              </div>

              {/* GitHub */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                <Github className="w-8 h-8 text-brand-navy mx-auto mb-4" />

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  GitHub
                </h3>

                <p className="text-gray-500 mb-4">
                  Código e evolução do projeto
                </p>

                <a
                  href="https://github.com/Diorgerb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-navy hover:underline font-medium break-all"
                >
                  github.com/Diorgerb
                </a>
              </div>
            </div>

            {/* Informações adicionais */}
          
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}