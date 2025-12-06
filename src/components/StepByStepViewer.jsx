import React from 'react';
import { X, BookOpen, ChevronRight } from 'lucide-react';

/**
 * Componente de visualización de solución paso a paso
 */
const StepByStepViewer = ({ isOpen, onClose, steps, expression }) => {
  if (!isOpen || !steps || steps.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-slate-800 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <BookOpen className="text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400">Solución Paso a Paso</h3>
              <p className="text-sm text-slate-400 font-mono mt-1">{expression}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Steps List */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)] custom-scrollbar">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className={`
                border-l-4 pl-4 py-3
                ${step.isResult 
                  ? 'border-green-500 bg-green-900/10' 
                  : step.info
                  ? 'border-blue-500 bg-blue-900/10'
                  : 'border-purple-500 bg-purple-900/10'
                }
              `}>
                <div className="flex items-start gap-3">
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${step.isResult 
                      ? 'bg-green-600 text-white' 
                      : 'bg-purple-600 text-white'
                    }
                  `}>
                    {step.isResult ? '✓' : index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`
                      font-semibold mb-1
                      ${step.isResult ? 'text-green-400' : 'text-purple-300'}
                    `}>
                      {step.title}
                    </h4>
                    <p className="text-slate-300 font-mono text-sm bg-slate-900/50 p-3 rounded">
                      {step.content}
                    </p>
                    {step.explanation && (
                      <p className="text-xs text-slate-500 mt-2 italic">
                        💡 {step.explanation}
                      </p>
                    )}
                  </div>
                </div>

                {index < steps.length - 1 && !step.isResult && (
                  <div className="ml-4 mt-2 flex items-center gap-2 text-slate-600">
                    <ChevronRight size={16} />
                    <div className="flex-1 h-px bg-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer tip */}
          <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
            <p className="text-xs text-slate-400">
              💡 <strong className="text-cyan-400">Tip:</strong> Para resolver más ecuaciones paso a paso,
              actualiza a <span className="text-yellow-400 font-semibold">CALQ Pro</span> y obtén
              soluciones detalladas ilimitadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepByStepViewer;
