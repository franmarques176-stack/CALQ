import { X } from 'lucide-react';

const FAQModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: "¿Cómo cancelo mi suscripción Premium?",
      a: "Puedes cancelar en cualquier momento desde tu cuenta de PayPal: Login en paypal.com → Configuración → Pagos → Gestionar pagos automáticos → Busca 'CALQ Pro' → Click 'Cancelar'. La cancelación es inmediata y no se realizarán más cobros."
    },
    {
      q: "¿Cuándo se me cobrará?",
      a: "El pago de €4.99 se procesa mensualmente el mismo día que te suscribiste. Por ejemplo, si te suscribes el 7 de diciembre, se cobrará el 7 de cada mes."
    },
    {
      q: "¿Ofrecen reembolsos?",
      a: "Al ser un producto digital con acceso inmediato a todas las funciones Premium, no ofrecemos reembolsos. Sin embargo, puedes cancelar en cualquier momento para evitar futuros cobros."
    },
    {
      q: "¿Qué incluye la versión Premium?",
      a: "Premium incluye: IA conversacional ilimitada para resolver problemas matemáticos, gráficas interactivas con zoom y exportación, solver paso a paso para ecuaciones, y soporte prioritario."
    },
    {
      q: "¿Puedo usar CALQ gratis?",
      a: "¡Sí! CALQ Free incluye todas las funciones básicas de calculadora y 20 consultas diarias a la IA. Premium elimina todos los límites."
    },
    {
      q: "¿Es seguro el pago con PayPal?",
      a: "Absolutamente. Todos los pagos se procesan a través de PayPal, una plataforma certificada PCI-DSS. Nunca almacenamos información de tu tarjeta."
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Preguntas Frecuentes</h2>
            <p className="text-slate-400 text-sm mt-1">Todo lo que necesitas saber sobre CALQ Premium</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold text-white flex items-start gap-2">
                  <span className="text-cyan-500 shrink-0">Q{index + 1}:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-300 pl-8 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <p className="text-slate-300">
              ¿Tienes más preguntas? Escríbenos a{' '}
              <a 
                href="mailto:calqpro@gmail.com" 
                className="text-cyan-500 hover:text-cyan-400 underline"
              >
                calqpro@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/30">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQModal;
