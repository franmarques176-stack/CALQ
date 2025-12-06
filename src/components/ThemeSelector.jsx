import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useCalqStore } from '../store/useCalqStore';

/**
 * Componente de selector de tema
 */
const ThemeSelector = () => {
  const { theme, setTheme } = useCalqStore();

  const themes = [
    { id: 'dark', name: 'Oscuro', icon: Moon, color: 'slate' },
    { id: 'light', name: 'Claro', icon: Sun, color: 'white' },
  ];

  return (
    <div className="flex items-center gap-2">
      {themes.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          className={`
            p-2 rounded-lg transition-all
            ${theme === id 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }
          `}
          title={name}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
