import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Componente para renderizar expresiones matemáticas con LaTeX
 * Detecta automáticamente patrones matemáticos y los renderiza visualmente
 */
const MathRenderer = ({ text }) => {
  if (!text || typeof text !== 'string') {
    return <span>{String(text)}</span>;
  }

  // Función para convertir notación matemática común a LaTeX
  const convertToLatex = (expr) => {
    let latex = expr;
    
    // sqrt(x) → \sqrt{x}
    latex = latex.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
    
    // Potencias: x^2 → x^{2}
    latex = latex.replace(/\^(\d+)/g, '^{$1}');
    latex = latex.replace(/\^([a-zA-Z])/g, '^{$1}');
    
    // Fracciones: a/b → \frac{a}{b} (solo para expresiones simples)
    latex = latex.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');
    
    // Pi
    latex = latex.replace(/\bpi\b/g, '\\pi');
    
    // Funciones trigonométricas
    latex = latex.replace(/\bsin\b/g, '\\sin');
    latex = latex.replace(/\bcos\b/g, '\\cos');
    latex = latex.replace(/\btan\b/g, '\\tan');
    latex = latex.replace(/\barcsin\b/g, '\\arcsin');
    latex = latex.replace(/\barccos\b/g, '\\arccos');
    latex = latex.replace(/\barctan\b/g, '\\arctan');
    
    // Logaritmos
    latex = latex.replace(/\blog\b/g, '\\log');
    latex = latex.replace(/\bln\b/g, '\\ln');
    
    // Infinito
    latex = latex.replace(/\binfinity\b/g, '\\infty');
    latex = latex.replace(/∞/g, '\\infty');
    
    // Integral
    latex = latex.replace(/integral\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/g, 
      '\\int_{$3}^{$4} $1 \\, d$2');
    
    // Suma
    latex = latex.replace(/sum\(([^,]+),\s*([^,]+),\s*([^)]+)\)/g, 
      '\\sum_{$2}^{$3} $1');
    
    // Límite
    latex = latex.replace(/lim\(([^,]+),\s*([^)]+)\)/g, '\\lim_{$1} $2');
    
    return latex;
  };

  // Detectar si contiene expresiones matemáticas significativas
  const hasMath = (str) => {
    const mathPatterns = [
      /sqrt\(/,
      /\^[\d{]/,
      /\b(sin|cos|tan|log|ln)\b/,
      /\\frac/,
      /\\sqrt/,
      /\bpi\b/,
      /integral\(/,
      /sum\(/,
      /[\+\-\*\/]\s*[\(\)\d]/,
      /[a-zA-Z]\^/
    ];
    
    return mathPatterns.some(pattern => pattern.test(str));
  };

  // Si no contiene matemáticas, retornar texto plano
  if (!hasMath(text)) {
    return <span>{text}</span>;
  }

  try {
    // Separar texto y expresiones matemáticas
    // Por ahora, renderizamos todo como inline math si detectamos patrones
    const latex = convertToLatex(text);
    
    // Si la expresión es muy corta o simple, inline
    // Si es compleja o tiene integrales/sumas, block
    const isBlockMath = /\\int|\\sum|\\frac/.test(latex) && latex.length > 20;
    
    if (isBlockMath) {
      return (
        <div className="my-2">
          <BlockMath math={latex} />
        </div>
      );
    } else {
      return <InlineMath math={latex} />;
    }
  } catch (error) {
    // Si falla el renderizado LaTeX, mostrar texto original
    console.warn('LaTeX rendering error:', error);
    return <span>{text}</span>;
  }
};

export default MathRenderer;
