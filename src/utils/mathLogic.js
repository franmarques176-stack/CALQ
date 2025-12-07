import { evaluate, format } from 'mathjs';

/**
 * Procesa la entrada del usuario usando mathjs.
 * @param {string} input - Texto del usuario (ej: "a = 10" o "a + 5")
 * @param {object} currentScope - Objeto con las variables actuales
 * @returns {object} - { result: string|number, originalInput: string, newScope: object, isError: boolean }
 */
export const processMathInput = (input, currentScope) => {
  // 1. Limpieza básica
  const cleanInput = input.trim();
  
  if (!cleanInput) return { result: null, originalInput: '', newScope: currentScope, isError: false };

  // Clonamos el scope profundamente para evitar mutaciones
  const scopeClone = JSON.parse(JSON.stringify(currentScope));

  try {
    // 2. Validación de tamaño (prevenir inputs maliciosos)
    if (cleanInput.length > 1000) {
      throw new Error('La expresión es demasiado larga (máximo 1000 caracteres)');
    }

    // 3. Evaluamos usando mathjs
    const result = evaluate(cleanInput, scopeClone);

    // 4. Formateamos la respuesta para que sea legible
    let displayResult;

    // Detección mejorada de asignación usando regex
    const assignmentPattern = /^[a-zA-Z_]\w*\s*=(?!=)/;
    const isAssignment = assignmentPattern.test(cleanInput);

    if (isAssignment) {
      // Si el resultado es una función (ej: f(x) = x^2), lo manejamos diferente
      if (typeof result === 'function') {
        displayResult = `✓ Función definida: ${cleanInput.split('=')[0].trim()}`;
      } else {
        // Sanitizamos el resultado para mostrar
        const sanitizedResult = typeof result === 'string' 
          ? result.substring(0, 100) // Limitamos strings largos
          : format(result, { precision: 14 });
        displayResult = `✓ Variable guardada: ${sanitizedResult}`;
      }
    } else {
      // Es un cálculo directo
      if (typeof result === 'number') {
        // Detectamos casos especiales
        if (!isFinite(result)) {
          displayResult = result > 0 ? '∞ (Infinito)' : '-∞ (Infinito negativo)';
        } else if (isNaN(result)) {
          displayResult = 'NaN (No es un número)';
        } else {
          displayResult = format(result, { precision: 14 });
        }
      } else if (typeof result === 'string') {
        displayResult = result.substring(0, 200); // Limitamos output
      } else {
        displayResult = format(result, { precision: 14 });
      }
    }

    return {
      result: displayResult,
      originalInput: cleanInput, // Agregamos la expresión original
      newScope: scopeClone,
      isError: false
    };

  } catch (error) {
    // Manejo de errores mejorado con mensajes específicos
    let errorMessage = '⚠️ Error: ';
    
    if (error.message.includes('Undefined symbol')) {
      const symbol = error.message.match(/Undefined symbol ([a-zA-Z_]\w*)/)?.[1];
      errorMessage += symbol 
        ? `La variable "${symbol}" no está definida. Defínela primero (ej: ${symbol} = 10)`
        : 'Variable no definida. Asegúrate de definirla primero.';
    } else if (error.message.includes('Unexpected')) {
      errorMessage += 'Sintaxis incorrecta. Revisa la expresión.';
    } else if (error.message.includes('Division by zero')) {
      errorMessage += 'No se puede dividir por cero.';
    } else if (error.message.includes('demasiado larga')) {
      errorMessage += error.message;
    } else {
      errorMessage += error.message || 'No entendí esa operación. Verifica la sintaxis.';
    }

    return {
      result: errorMessage,
      originalInput: cleanInput,
      newScope: currentScope, // El scope no cambia si hay error
      isError: true
    };
  }
};

/**
 * Genera un ID único seguro
 * @returns {string} UUID v4
 */
export const generateUniqueId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para navegadores antiguos
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Sanitiza texto para prevenir XSS
 * @param {string} text - Texto a sanitizar  
 * @returns {string} Texto sanitizado
 */
export const sanitizeText = (text) => {
  if (typeof text !== 'string') return String(text);
  
  // Escapamos caracteres HTML peligrosos
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};