import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Componente para renderizar expresiones matemáticas con LaTeX
 * Detecta automáticamente patrones matemáticos y los renderiza visualmente
 */
const MathRenderer = ({ text, showOriginalInput }) => {
  if (!text || typeof text === 'string') {
    return <span>{String(text)}</span>;
  }

  // Para mensajes que son solo números, retornamos tal cual
  if (/^-?\d+(\.\d+)?$/.test(text)) {
    return <span className="text-lg font-bold">{text}</span>;
  }

  // Función para convertir notación matemática común a LaTeX
  const convertToLatex = (expr) => {
    let latex = expr;
    
    // sqrt(x) → \sqrt{x}
    latex = latex.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
    
    // Potencias: x^2 → x^{2}, 2^3 → 2^{3}
    latex = latex.replace(/([a-zA-Z0-9]+)\^(\d+)/g, '$1^{$2}');
    latex =latex.replace(/([a-zA-Z0-9]+)\^([a-zA-Z])/g, '$1^{$2}');
    
    // Fracciones: a/b → \frac{a}{b}
    latex = latex.replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}');
    
    // Pi
    latex = latex.replace(/\bpi\b/g, '\\pi');
    
    // Funciones trigonométricas
    latex = latex.replace(/\bsin\b/g, '\\sin');
    latex = latex.replace(/\bcos\b/g, '\\cos');
    latex = latex.replace(/\btan\b/g, '\\tan');
    
    // Logaritmos
    latex = latex.replace(/\blog\b/g, '\\log');
    latex = latex.replace(/\bln\b/g, '\\ln');
    
    // Raíz cuadrada symbol
    latex = latex.replace(/√/g, '\\sqrt');
    
    // Infinito
    latex = latex.replace(/∞/g, '\\infty');
    
    return latex;
  };

  // Detectar si contiene expresiones matemáticas significativas
  const hasMath = (str) => {
    const mathPatterns = [
      /sqrt\(/,
      /\^/,
      /\b(sin|cos|tan|log|ln)\b/,
      /\bpi\b/,
      /√/,
      /∞/,
      /[a-zA-Z]\d/,  // Variables con números
      /\+|\-|\*|\//   // Operadores
    ];
    
    return mathPatterns.some(pattern => pattern.test(str));
  };

  // Si no contiene matemáticas, retornar texto plano
  if (!hasMath(text)) {
    return <span>{text}</span>;
  }

  try {
    const latex = convertToLatex(text);
    return <InlineMath math={latex} />;
  } catch (error) {
    // Si falla el renderizado LaTeX, mostrar texto original
    console.warn('LaTeX rendering error:', error, 'for text:', text);
    return <span>{text}</span>;
  }
};

export default MathRenderer;
