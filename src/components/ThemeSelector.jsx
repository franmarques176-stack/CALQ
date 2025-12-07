import React, { useState } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useCalqStore } from '../store/useCalqStore';
import ThemePicker from './ThemePicker';

const ThemeSelector = () => {
  const { theme, setTheme } = useCalqStore();
  const [showThemePicker, setShowThemePicker] = useState(false);

  const themes = [
    { id: 'dark', name: 'Oscuro', icon: Moon },
    { id: 'light', name: 'Claro', icon: Sun },
  ];

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowThemePicker(true)}
          className="p-2 rounded-lg transition-all bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-cyan-400"
          title="Elegir Tema"
        >
          <Palette size={18} />
        </button>

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

      <ThemePicker isOpen={showThemePicker} onClose={() => setShowThemePicker(false)} />
    </>
  );
};

export default ThemeSelector;
