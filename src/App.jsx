import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Trash2, Sparkles, TrendingUp, BookOpen, Settings, HelpCircle } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ConfirmModal from './components/ConfirmModal';
import GraphViewer from './components/GraphViewer';
import AIAssistant from './components/AIAssistant';
import StepByStepViewer from './components/StepByStepViewer';
import UpgradeModal from './components/UpgradeModal';
import FAQModal from './components/FAQModal';
import ParticlesBackground from './components/ParticlesBackground';
import ThemeSelector from './components/ThemeSelector';
import { processMathInput, generateUniqueId } from './utils/mathLogic';
import { solveStepByStep } from './utils/stepSolver';
import { useCalqStore } from './store/useCalqStore';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

function App() {
  // --- ESTADOS ---
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Estados de modales premium
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [graphExpression, setGraphExpression] = useState('');
  
  const [showAIModal, setShowAIModal] = useState(false);
  
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [currentExpression, setCurrentExpression] = useState('');
  
  const [showFAQModal, setShowFAQModal] = useState(false);
  
  // Store global
  const { 
    theme,
    isPremium, 
    canUseAI, 
    incrementAiQueries,
    showUpgradeModal,
    setShowUpgradeModal 
  } = useCalqStore();
  
  // Carga de mensajes con manejo robusto de errores
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('calq_msgs');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [getWelcomeMessage()];
      }
    } catch (error) {
      console.error('Error cargando mensajes desde localStorage:', error);
    }
    return [getWelcomeMessage()];
  });

  // Carga del Scope/Memoria con manejo robusto
  const [mathScope, setMathScope] = useState(() => {
    try {
      const saved = localStorage.getItem('calq_scope');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error cargando scope desde localStorage:', error);
      return {};
    }
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // --- FUNCIONES HELPER ---
  
  function getWelcomeMessage() {
    return { 
      id: generateUniqueId(), 
      text: "👋 Bienvenido a CALQ Pro - La mejor calculadora del mundo\n\n✨ Ahora con IA, gráficas interactivas y solver paso a paso\n\nPrueba: 'f(x) = x^2', pregunta a la IA, o calcula directamente.", 
      isUser: false 
    };
  }

  // Debounced localStorage save
  const saveTimeoutRef = useRef(null);
  const debouncedSave = useCallback((key, value) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error guardando ${key} en localStorage:`, error);
      }
    }, 300);
  }, []);

  // --- EFECTOS ---

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Persistencia con debounce
  useEffect(() => {
    debouncedSave('calq_msgs', messages);
  }, [messages, debouncedSave]);

  useEffect(() => {
    debouncedSave('calq_scope', mathScope);
  }, [mathScope, debouncedSave]);

  // Aplicar tema
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // --- HANDLERS ---

  const handleSend = useCallback((e) => {
    e?.preventDefault?.();
    if (!input.trim() || isProcessing) return;

    const userText = input;
    setInput(''); 
    setIsProcessing(true);

    // Agregar al historial de comandos
    setCommandHistory(prev => [...prev, userText]);
    setHistoryIndex(-1);

    // 1. Mensaje Usuario
    const newUserMsg = { id: generateUniqueId(), text: userText, isUser: true };
    setMessages(prev => [...prev, newUserMsg]);

    // 2. Respuesta CALQ
    setTimeout(() => {
      const { result, newScope, isError } = processMathInput(userText, mathScope);
      
      const newAppMsg = { 
        id: generateUniqueId(), 
        text: result, 
        isUser: false, 
        isError 
      };

      setMessages(prev => [...prev, newAppMsg]);
      if (!isError) setMathScope(newScope); 
      
      // Auto-detectar si se puede graficar
      if (!isError && (userText.includes('f(') || userText.includes('x'))) {
        setGraphExpression(userText);
      }
      
      setIsProcessing(false);
    }, 50);
  }, [input, isProcessing, mathScope]);

  const handleClear = useCallback(() => {
    setMessages([getWelcomeMessage()]);
    setMathScope({});
    setCommandHistory([]);
    setHistoryIndex(-1);
    try {
      localStorage.removeItem('calq_msgs');
      localStorage.removeItem('calq_scope');
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
    }
  }, []);

  // Navegación de historial con teclado
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1);
      
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  }, [commandHistory, historyIndex]);

  // Handlers de features premium
  const handleOpenAI = () => {
    if (!canUseAI()) {
      setShowUpgradeModal(true);
      return;
    }
    incrementAiQueries();
    setShowAIModal(true);
  };

  const handleShowSteps = () => {
    if (!isPremium) {
      setShowUpgradeModal(true);
      return;
    }
    
    if (!input.trim()) return;
    
    const steps = solveStepByStep(input);
    setCurrentSteps(steps.steps);
    setCurrentExpression(input);
    setShowStepsModal(true);
  };

  const handleAISuggestion = (calculation) => {
    setInput(calculation);
    inputRef.current?.focus();
  };

  // Atajos de teclado
  useKeyboardShortcuts({
    onClear: () => setShowConfirmModal(true),
    onOpenGraph: () => isPremium ? setShowGraphModal(true) : setShowUpgradeModal(true),
    onOpenAI: handleOpenAI,
    onOpenHelp: () => setShowFAQModal(true),
    onOpenSteps: handleShowSteps
  });

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'
      } overflow-hidden font-sans relative`}>
      
      {/* Partículas Animadas de Fondo */}
      <ParticlesBackground theme={theme} />
      
      {/* HEADER CALQ */}
      <header className={`flex justify-between items-center p-5 z-10 glass-effect border-b ${
        theme === 'dark' ? 'border-slate-700/50' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center glow-cyan animate-float">
            <span className="text-slate-100 font-bold text-xl font-mono">Q</span>
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold tracking-widest text-slate-100 font-sans leading-none">CALQ</h1>
            <span className="text-[10px] text-cyan-500 tracking-[0.2em] uppercase font-semibold animate-pulse-subtle">Pro Edition</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeSelector />
          
          {!isPremium && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold rounded-lg text-sm transition-all shadow-lg shadow-yellow-500/30"
            >
              Upgrade Pro
            </button>
          )}
          
          <button
            onClick={() => setShowFAQModal(true)}
            className={`p-3 rounded-full ${
              theme === 'dark' ? 'text-slate-400 hover:text-cyan-400' : 'text-slate-600 hover:text-cyan-600'
            } active:scale-95 transition-all shadow-[4px_4px_8px_#0b1120,-4px_-4px_8px_#1e293b]`}
            title="Preguntas Frecuentes"
          >
            <HelpCircle size={20} />
          </button>
          
          <button 
            onClick={() => setShowConfirmModal(true)}
            className={`p-3 rounded-full ${
              theme === 'dark' ? 'text-slate-400 hover:text-red-400' : 'text-slate-600 hover:text-red-600'
            } active:scale-95 transition-all shadow-[4px_4px_8px_#0b1120,-4px_-4px_8px_#1e293b]`}
            title="Borrar historial"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </header>

      {/* TOOLBAR */}
      <div className={`flex gap-2 px-4 py-3 border-b ${
        theme === 'dark' ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
      }`}>
        <button
          onClick={handleOpenAI}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors shadow-lg shadow-cyan-600/20"
        >
          <Sparkles size={16} />
          Asistente IA {!isPremium && `(${20 - useCalqStore.getState().aiQueriesUsed}/20)`}
        </button>
        
        <button
          onClick={() => graphExpression && setShowGraphModal(true)}
          disabled={!graphExpression}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
            graphExpression
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <TrendingUp size={16} />
          Ver Gráfica
        </button>
        
        <button
          onClick={handleShowSteps}
          disabled={!input.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
            input.trim()
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <BookOpen size={16} />
          Paso a Paso {!isPremium && '🔒'}
        </button>
      </div>

      {/* ÁREA DE CHAT */}
      <main className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {messages.map((msg) => (
          <ChatMessage 
            key={msg.id} 
            text={msg.text} 
            isUser={msg.isUser} 
            isError={msg.isError} 
          />
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className={`${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
            } px-4 py-3 rounded-2xl rounded-bl-none border-r border-slate-700`}>
              <span className="text-slate-400 animate-pulse">Procesando...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* INPUT BAR */}
      <div className={`p-4 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <form 
          onSubmit={handleSend}
          className={`flex items-center gap-3 p-2 rounded-3xl ${
            theme === 'dark' 
              ? 'bg-slate-900 shadow-[inset_3px_3px_6px_#0b1120,inset_-3px_-3px_6px_#1e293b] border border-slate-800'
              : 'bg-white shadow-lg border border-slate-200'
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu operación... (↑↓ para historial)"
            className={`flex-1 bg-transparent border-none outline-none ${
              theme === 'dark' ? 'text-slate-200 placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'
            } px-4 py-3 font-mono text-lg`}
            autoFocus
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className={`
              p-3 rounded-full transition-all duration-300 transform
              ${input.trim() && !isProcessing
                ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)] scale-100 rotate-0' 
                : 'bg-slate-800 text-slate-600 scale-90 -rotate-45'
              }
            `}
          >
            <Send size={20} />
          </button>
        </form>
        <div className="text-center mt-2 text-xs text-slate-600">
          Tip: Usa IA para preguntas • Gráficas para funciones • Paso a Paso para aprender
        </div>
      </div>

      {/* MODALES */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleClear}
        title="¿Reiniciar CALQ?"
        message="Se borrará todo el historial de mensajes y las variables guardadas. Esta acción no se puede deshacer."
      />

      <GraphViewer
        isOpen={showGraphModal}
        onClose={() => setShowGraphModal(false)}
        expression={graphExpression}
      />

      <AIAssistant
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onSuggestCalculation={handleAISuggestion}
      />

      <StepByStepViewer
        isOpen={showStepsModal}
        onClose={() => setShowStepsModal(false)}
        steps={currentSteps}
        expression={currentExpression}
      />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="IA ilimitada y solver paso a paso"
      />
      
      <FAQModal
        isOpen={showFAQModal}
        onClose={() => setShowFAQModal(false)}
      />
    </div>
  );
}

export default App;