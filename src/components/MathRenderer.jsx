import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Componente para renderizar expresiones matemáticas con LaTeX
 * Ahora recibe tanto la expresión original como el resultado
 */
const MathRenderer = ({ text, originalExpression }) => {
  if (!text) {
    return null;
  }

  const textStr = String(text);

  // Si tenemos la expresión original, mostrarla con LaTeX
  if (originalExpression && originalExpression !== textStr) {
    try {
      // Convertir la expresión original a LaTeX
      let latex = originalExpression;
      
      // sqrt(x) → \sqrt{x}
      latex = latex.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
      
      // Potencias: 2^3 → 2^{3}
      latex = latex.replace(/([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, '$1^{$2}');
      
      // Pi
      latex = latex.replace(/\bpi\b/g, '\\pi');
      
      // Funciones trig
      latex = latex.replace(/\bsin\b/g, '\\sin');
      latex = latex.replace(/\bcos\b/g, '\\cos');
      latex = latex.replace(/\btan\b/g, '\\tan');
      
      return (
        <div>
          <div className="text-sm text-slate-400 mb-1">
            <InlineMath math={latex} />
          </div>
          <div className="text-lg font-bold text-cyan-400">
            = {textStr}
          </div>
        </div>
      );
    } catch (error) {
      console.warn('LaTeX error:', error);
    }
  }
  
  // Sin expresión original o error, mostrar solo resultado
  return <span>{textStr}</span>;
};

export default MathRenderer;
