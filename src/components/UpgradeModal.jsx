import React, { useEffect, useRef, useState } from 'react';
import { Crown, Check, CreditCard, X } from 'lucide-react';
import { useCalqStore } from '../store/useCalqStore';

/**
 * Modal de upgrade a Premium con PayPal Subscriptions
 * Soporta pago con cuenta PayPal O tarjeta bancaria
 */
const UpgradeModal = ({ isOpen, onClose, feature = 'esta función' }) => {
  const paypalButtonsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useCalqStore();

  useEffect(() => {
    if (!isOpen || !window.paypal) return;

    // Limpiar botones previos
    if (paypalButtonsRef.current) {
      paypalButtonsRef.current.innerHTML = '';
    }

    // Configurar botones PayPal
    try {
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            // IMPORTANTE: Reemplaza con tu PLAN ID real de PayPal
            plan_id: 'P-XXXXXXXXXXXXXXXXXX' // Tu Plan ID aquí
          });
        },
        onApprove: function(data, actions) {
          // Suscripción exitosa
          console.log('Subscription successful!', data);
          
          // Actualizar usuario a premium
          setUser({
            id: data.subscriptionID,
            email: 'user@example.com', // En producción, obtener del backend
            premium: true,
            subscriptionId: data.subscriptionID,
            paymentMethod: 'paypal'
          });

          // Mostrar éxito
          alert('🎉 ¡Bienvenido a CALQ Pro!\n\nTu suscripción está activa. Ahora tienes acceso ilimitado a todas las features premium.\n\nID de suscripción: ' + data.subscriptionID);
          
          onClose();
          
          // Opcional: Redirigir a página de éxito
          // window.location.href = '/success?subscription=' + data.subscriptionID;
        },
        onError: function(err) {
          console.error('PayPal error:', err);
          alert('❌ Error al procesar el pago\n\nPor favor, intenta de nuevo o contacta soporte.');
        },
        onCancel: function(data) {
          console.log('User cancelled:', data);
          alert('⚠️ Pago cancelado\n\nPuedes intentar de nuevo cuando quieras.');
        }
      }).render(paypalButtonsRef.current);
    } catch (error) {
      console.error('Error rendering PayPal buttons:', error);
    }

    return () => {
      // Cleanup
      if (paypalButtonsRef.current) {
        paypalButtonsRef.current.innerHTML = '';
      }
    };
  }, [isOpen, onClose, setUser]);

  if (!isOpen) return null;

  const features = [
    'IA conversacional ilimitada',
    'Solver paso a paso en todas las operaciones',
    'Gráficas avanzadas con exportación',
    'Historial en la nube (acceso desde cualquier dispositivo)',
    'Sin anuncios',
    'Soporte prioritario',
    'Calculadoras especializadas premium',
    'Exportar resultados en PDF/LaTeX'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-yellow-500/30 overflow-hidden">
        {/* Premium Badge */}
        <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-500 to-yellow-600 px-4 py-1 rounded-bl-xl">
          <span className="text-xs font-bold text-slate-900">PREMIUM</span>
        </div>

        {/* Header */}
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl mb-4 shadow-lg shadow-yellow-500/30">
            <Crown size={32} className="text-slate-900" />
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
            Desbloquea CALQ Pro
          </h2>
          <p className="text-slate-400">
            Necesitas <span className="text-cyan-400 font-semibold">{feature}</span> premium
          </p>
        </div>

        {/* Pricing */}
        <div className="px-8 pb-6">
          <div className="bg-slate-900/50 border border-yellow-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold text-yellow-400">$4.99</span>
              <span className="text-slate-400">/mes</span>
            </div>
            <p className="text-center text-sm text-slate-500 mb-4">
              Cancela cuando quieras • Sin compromisos
            </p>
            
            <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <CreditCard size={14} className="text-green-500" />
                <span>PayPal</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <CreditCard size={14} className="text-blue-500" />
                <span>Tarjeta bancaria</span>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-0.5 flex-shrink-0">
                  <Check size={18} className="text-yellow-500" />
                </div>
                <span className="text-sm text-slate-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* PayPal Buttons Container */}
          <div className="mb-4">
            <div 
              ref={paypalButtonsRef}
              className="min-h-[150px] flex items-center justify-center"
            >
              {/* PayPal buttons will render here */}
              {!window.paypal && (
                <div className="text-center p-4">
                  <p className="text-slate-500 mb-2">Cargando pasarela de pago segura...</p>
                  <div className="animate-pulse flex justify-center gap-2">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alternative: Continue Free */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors border border-slate-700"
          >
            Continuar con Plan Gratis
          </button>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-slate-700 flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Check size={14} className="text-green-500" />
              <span>Pago 100% seguro</span>
            </div>
            <div className="flex items-center gap-1">
              <Check size={14} className="text-green-500" />
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center gap-1">
              <Check size={14} className="text-green-500" />
              <span>Soporte 24/7</span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
            <p className="text-xs text-blue-300 text-center">
              💳 Puedes pagar con <strong>PayPal</strong> o directamente con tu <strong>tarjeta de crédito/débito</strong> sin necesidad de cuenta PayPal
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg transition-colors z-10"
        >
          <X size={20} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default UpgradeModal;
