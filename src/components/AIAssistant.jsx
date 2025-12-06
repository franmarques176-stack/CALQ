import React, { useState } from 'react';
import { Sparkles, X, Loader } from 'lucide-react';

/**
 * Componente de IA Conversacional
 * Usa Groq API (gratis) para procesamiento de lenguaje natural
 */
const AIAssistant = ({ isOpen, onClose, onSuggestCalculation }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      // Simulación de IA (en producción, usar Groq API)
      // API Key gratuita de Groq: https://console.groq.com
      
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Respuesta simulada inteligente
      const aiResponse = generateSmartResponse(query);
      
      setResponse(aiResponse);
    } catch (error) {
      setResponse({
        text: `Error: ${error.message}`,
        calculation: null,
        isError: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCalculation = (calc) => {
    onSuggestCalculation(calc);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl border border-cyan-500/30">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-600/20 rounded-lg">
              <Sparkles className="text-cyan-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400">Asistente IA</h3>
              <p className="text-sm text-slate-400">Pregunta en lenguaje natural</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Input */}
          <div className="mb-4">
            <label className="block text-sm text-slate-400 mb-2">
              ¿Qué quieres calcular?
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Tengo 5000 euros y quiero saber cuánto tendré en 3 años con 5% de interés anual compuesto"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-600 min-h-[100px] resize-none focus:outline-none focus:border-cyan-500 transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleAskAI();
                }
              }}
            />
            <div className="text-xs text-slate-500 mt-1">
              Presiona Ctrl+Enter para enviar
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleAskAI}
            disabled={!query.trim() || isLoading}
            className={`
              w-full py-3 rounded-lg font-semibold transition-all mb-4
              ${query.trim() && !isLoading
                ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-600/30' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin" size={18} />
                Pensando...
              </span>
            ) : (
              'Preguntar a IA'
            )}
          </button>

          {/* Response */}
          {response && (
            <div className={`
              border rounded-lg p-4
              ${response.isError 
                ? 'border-red-800 bg-red-900/20' 
                : 'border-cyan-800 bg-cyan-900/20'
              }
            `}>
              <h4 className="font-semibold text-cyan-300 mb-2">Respuesta:</h4>
              <p className="text-slate-300 text-sm mb-3 whitespace-pre-line">
                {response.text}
              </p>

              {response.calculation && (
                <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-700">
                  <p className="text-xs text-slate-500 mb-1">Cálculo sugerido:</p>
                  <code className="text-cyan-400 font-mono">{response.calculation}</code>
                  <button
                    onClick={() => handleUseCalculation(response.calculation)}
                    className="mt-2 w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded transition-colors"
                  >
                    Usar este cálculo
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Examples */}
          {!response && !isLoading && (
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-2">Ejemplos de preguntas:</p>
              <div className="space-y-2">
                {[
                  'Si tengo $1000 y ahorro $200 mensuales, ¿cuánto tendré en un año?',
                  'Resuelve la ecuación: 2x + 5 = 15',
                  'Calcula el área de un círculo con radio 7'
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(example)}
                    className="w-full text-left text-xs text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50 p-2 rounded transition-colors"
                  >
                    "{example}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Genera respuestas inteligentes basadas en patrones
 * En producción, esto se reemplaza con API de Groq
 */
function generateSmartResponse(query) {
  const lowerQuery = query.toLowerCase();

  // Detección de patrones comunes
  if (lowerQuery.includes('interés') && lowerQuery.includes('compuesto')) {
    const amount = extractNumber(query, 0);
    const rate = extractNumber(query,1) / 100 || 0.05;
    const years = extractNumber(query, 2) || 3;
    
    const result = amount * Math.pow(1 + rate, years);
    
    return {
      text: `Con un capital inicial de ${amount}€, un interés del ${(rate*100).toFixed(1)}% anual durante ${years} años:\n\nCapital final = ${amount} × (1 + ${rate})^${years}\nCapital final = ${result.toFixed(2)}€\n\nIntereses ganados: ${(result - amount).toFixed(2)}€`,
      calculation: `${amount} * (1 + ${rate})^${years}`
    };
  }

  if (lowerQuery.includes('ahorro') && lowerQuery.includes('mes')) {
    const initial = extractNumber(query, 0) || 0;
    const monthly = extractNumber(query, 1) || 200;
    const months = extractNumber(query, 2) || 12;
    
    const total = initial + (monthly * months);
    
    return {
      text: `Capital inicial: ${initial}€\nAhorro mensual: ${monthly}€\nDuración: ${months} meses\n\nTotal ahorrado: ${initial} + (${monthly} × ${months}) = ${total}€`,
      calculation: `${initial} + (${monthly} * ${months})`
    };
  }

  if (lowerQuery.includes('ecuación') || lowerQuery.includes('resuelve')) {
    return {
      text: `Para resolver ecuaciones, escríbelas directamente en CALQ.\nEjemplo: "2*x + 5 = 15" o "x^2 - 4 = 0"`,
      calculation: null
    };
  }

  if (lowerQuery.includes('área') && lowerQuery.includes('círculo')) {
    const radius = extractNumber(query, 0) || 1;
    const area = Math.PI * radius * radius;
    
    return {
      text: `Área del círculo con radio ${radius}:\n\nA = π × r²\nA = π × ${radius}²\nA = ${area.toFixed(2)} unidades cuadradas`,
      calculation: `pi * ${radius}^2`
    };
  }

  // Respuesta genérica
  return {
    text: `Entendido tu pregunta: "${query}"\n\nIntenta reformularla incluyendo:\n• Números específicos\n• Operación que deseas realizar\n• Contexto del problema`,
    calculation: null
  };
}

/**
 * Extrae números de un texto
 */
function extractNumber(text, index = 0) {
  const numbers = text.match(/\d+\.?\d*/g);
  return numbers && numbers[index] ? parseFloat(numbers[index]) : null;
}

export default AIAssistant;
