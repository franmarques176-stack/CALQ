import React from 'react';

const ChatMessage = ({ text, isUser, isError }) => {
  // Sanitización básica para prevenir XSS (el texto ya viene sanitizado de mathLogic)
  const displayText = typeof text === 'string' ? text : String(text);

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[85%] p-4 rounded-2xl text-base transition-all duration-300
          ${isUser 
            ? 'bg-slate-800 text-cyan-400 rounded-br-none border-l border-slate-700' 
            : isError
              ? 'bg-slate-800 text-red-400 rounded-bl-none border border-red-900/30' 
              : 'bg-slate-800 text-slate-200 rounded-bl-none border-r border-slate-700' 
          }
          shadow-[5px_5px_10px_#0b1120,-5px_-5px_10px_#1e293b]
        `}
      >
        <span className={isUser ? 'font-sans' : 'font-mono font-medium'}>
          {displayText}
        </span>
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
  isError: () => null // Opcional
};

export default React.memo(ChatMessage);