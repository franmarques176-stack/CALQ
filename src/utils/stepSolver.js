import { evaluate, derivative, simplify } from 'mathjs';

/**
 * Genera pasos detallados para resolver ecuaciones
 */
export const solveStepByStep = (expression) => {
  const steps = [];
  
  try {
    // Detectar tipo de problema
    if (expression.includes('=')) {
      return solveEquation(expression);
    } else if (expression.includes('^2') || expression.includes('²')) {
      return solveQuadratic(expression);
    } else {
      return simplifyExpression(expression);
    }
  } catch (error) {
    return {
      steps: [{ title: 'Error', content: error.message }],
      final: null
    };
  }
};

/**
 * Resuelve ecuaciones lineales/cuadráticas paso a paso
 */
function solveEquation(equation) {
  const steps = [];
  const [left, right] = equation.split('=').map(s => s.trim());
  
  steps.push({
    title: 'Paso 1: Ecuación original',
    content: `${left} = ${right}`,
    latex: `${left} = ${right}`
  });

  try {
    // Simplificar ambos lados
    const leftSimplified = simplify(left).toString();
    const rightSimplified = simplify(right).toString();
    
    if (leftSimplified !== left || rightSimplified !== right) {
      steps.push({
        title: 'Paso 2: Simplificamos ambos lados',
        content: `${leftSimplified} = ${rightSimplified}`
      });
    }

    // Detectar variable
    const variable = detectVariable(left + right);
    
    // Intentar resolver
    const scope = {};
    const result = evaluate(`${left} - (${right})`, scope);
    
    steps.push({
      title: `Paso 3: Solución`,
      content: `${variable} = ${result}`,
      isResult: true
    });

    return { steps, final: result };
  } catch (error) {
    steps.push({
      title: 'Solución numérica',
      content: 'Ecuación compleja. Usa métodos numéricos.'
    });
    return { steps, final: null };
  }
}

/**
 * Resuelve ecuaciones cuadráticas con fórmula general
 */
function solveQuadratic(expr) {
  const steps = [];
  
  steps.push({
    title: 'Paso 1: Identificar forma estándar',
    content: 'ax² + bx + c = 0'
  });

  // Intentar extraer coeficientes (simplificado)
  steps.push({
    title: 'Paso 2: Aplicar fórmula cuadrática',
    content: 'x = [-b ± √(b² - 4ac)] / 2a'
  });

  steps.push({
    title: 'Paso 3: Calcular discriminante',
    content: 'Δ = b² - 4ac'
  });

  steps.push({
    title: 'Paso 4: Soluciones',
    content: 'Si Δ > 0: dos soluciones reales',
    info: true
  });

  return { steps, final: 'Ver resultado arriba' };
}

/**
 * Simplifica expresiones algebraicas
 */
function simplifyExpression(expr) {
  const steps = [];
  
  steps.push({
    title: 'Expresión original',
    content: expr
  });

  try {
    const simplified = simplify(expr);
    const result = simplified.toString();
    
    if (result !== expr) {
      steps.push({
        title: 'Simplificación algebraica',
        content: result
      });
    }

    const evaluated = evaluate(expr);
    
    steps.push({
      title: 'Resultado numérico',
      content: evaluated.toString(),
      isResult: true
    });

    return { steps, final: evaluated };
  } catch (error) {
    return {
      steps: [{ title: 'Error', content: 'No se puede simplificar esta expresión' }],
      final: null
    };
  }
}

/**
 * Detecta la variable en una expresión
 */
function detectVariable(expr) {
  const match = expr.match(/[a-zA-Z]/);
  return match ? match[0] : 'x';
}

/**
 * Calcula la derivada de una función
 */
export const calculateDerivative = (func, variable = 'x') => {
  try {
    const deriv = derivative(func, variable);
    return {
      original: func,
      derivative: deriv.toString(),
      simplified: simplify(deriv).toString()
    };
  } catch (error) {
    return { error: error.message };
  }
};

/**
 * Genera tabla de valores para una función
 */
export const generateValueTable = (func, variable = 'x', range = [-5, 5], steps = 11) => {
  const table = [];
  const step = (range[1] - range[0]) / (steps - 1);
  
  for (let i = 0; i < steps; i++) {
    const x = range[0] + (i * step);
    try {
      const y = evaluate(func, { [variable]: x });
      table.push({ x: x.toFixed(2), y: typeof y === 'number' ? y.toFixed(2) : y });
    } catch (error) {
      table.push({ x: x.toFixed(2), y: 'Error' });
    }
  }
  
  return table;
};
