import { useEffect } from 'react';

/**
 * Hook personalizado para atajos de teclado de CALQ
 */
const useKeyboardShortcuts = ({ 
  onClear, 
  onOpenGraph, 
  onOpenAI, 
  onOpenHelp,
  onOpenSteps 
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K: Limpiar
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClear?.();
      }

      // Ctrl/Cmd + G: Gráficas
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        onOpenGraph?.();
      }

      // Ctrl/Cmd + I: IA Assistant
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        onOpenAI?.();
      }

      // Ctrl/Cmd + /: Ayuda
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        onOpenHelp?.();
      }

      // Ctrl/Cmd + S: Solver paso a paso
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onOpenSteps?.();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClear, onOpenGraph, onOpenAI, onOpenHelp, onOpenSteps]);
};

export default useKeyboardShortcuts;
