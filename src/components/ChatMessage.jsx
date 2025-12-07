import React from 'react';
import { useCalqStore } from '../store/useCalqStore';

const ChatMessage = ({ text, isUser, isError, originalExpression }) => {
  // Sanitización básica para prevenir XSS (el texto ya viene sanitizado de mathLogic)
  const displayText = typeof text === 'string' ? text : String(text);
  const { theme } = useCalqStore();

  // Solo renderizar expresión original para resultados numéricos con expresión original
  const shouldRenderMath = !isUser && originalExpression && !isError;
  const isSimpleNumber = /^-?\d+(\.\d+)?$/.test(displayText);

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[85%] p-4 rounded-2xl text-base transition-all duration-300
          ${isUser 
            ? theme === 'dark'
              ? 'bg-slate-800 text-cyan-400 rounded-br-none border-l border-slate-700'
              : 'bg-cyan-50 text-cyan-700 rounded-br-none border-l-2 border-cyan-500'
            : isError
              ? theme === 'dark'
                ? 'bg-slate-800 text-red-400 rounded-bl-none border border-red-900/30'
                : 'bg-red-50 text-red-700 rounded-bl-none border border-red-300'
              : theme === 'dark'
                ? 'bg-slate-800 text-slate-200 rounded-bl-none border-r border-slate-700'
                : 'bg-white text-slate-800 rounded-bl-none border-r-2 border-slate-300' 
          }
          ${theme === 'dark' 
            ? 'shadow-[5px_5px_10px_#0b1120,-5px_-5px_10px_#1e293b]'
            : 'shadow-lg'
          }
        `}
      >
        <div className={isUser ? 'font-sans' : 'font-mono font-medium'}>
          {shouldRenderMath && isSimpleNumber ? (
            // Mostrar expresión original + resultado
            <div>
              <div className="text-sm opacity-75 mb-1">{originalExpression}</div>
              <div className="text-lg font-bold text-cyan-400">= {displayText}</div>
            </div>
          ) : (
            displayText
          )}
        </div>
      </div>
    </div>
  );
};

// PropTypes para validación en desarrollo
ChatMessage.propTypes = {
  text: (props, propName, componentName) => {
    if (props[propName] === undefined || props[propName] === null) {
      return new Error(`Prop '${propName}' is required in '${componentName}'.`);
    }
  },
  isUser: (props, propName) => {
    if (typeof props[propName] !== 'boolean') {
      return new Error(`Prop '${propName}' must be a boolean.`);
    }
  },
  isError: () => null, // Opcional
  originalExpression: () => null // Opcional
};

export default React.memo(ChatMessage);