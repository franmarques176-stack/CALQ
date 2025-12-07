import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useCalqStore } from '../store/useCalqStore';
import { themeList } from '../config/themes';

const ThemePicker = ({ isOpen, onClose }) => {
  const { selectedTheme, setSelectedTheme } = useCalqStore();

  if (!isOpen) return null;

  const handleSelectTheme = (themeId) => {
    setSelectedTheme(themeId);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="glass-effect border border-slate-700 rounded-2xl p-6 max-w-3xl w-full max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Elige tu Tema</h2>
            <p className="text-slate-400 text-sm mt-1">Personaliza el aspecto de CALQ</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {themeList.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={selectedTheme === theme.id}
              onSelect={handleSelectTheme}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ThemeCard = ({ theme, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => onSelect(theme.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative p-4 rounded-xl border-2 transition-all duration-300
        ${isSelected 
          ? 'border-cyan-500 bg-slate-800/50 scale-105' 
          : 'border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:scale-102'
        }
        ${isHovered ? 'shadow-xl' : 'shadow-md'}
      `}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-cyan-500 rounded-full p-1.5">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}

      <h3 className="text-lg font-bold text-white mb-2">{theme.name}</h3>
      <p className="text-slate-400 text-xs mb-4">{theme.description}</p>

      <div className="flex gap-2 mb-3">
        <div 
          className="w-10 h-10 rounded-full border-2 border-white/20"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <div 
          className="w-10 h-10 rounded-full border-2 border-white/20"
          style={{ backgroundColor: theme.colors.accent }}
        />
        <div 
          className="w-10 h-10 rounded-full border-2 border-white/20"
          style={{ backgroundColor: theme.colors.bgDark }}
        />
      </div>

      <div 
        className="rounded-lg p-3 border border-white/10"
        style={{ backgroundColor: theme.colors.bgDark }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <span className="text-xs font-bold" style={{ color: theme.colors.textDark }}>Q</span>
          </div>
          <span className="text-xs font-semibold" style={{ color: theme.colors.textDark }}>
            CALQ
          </span>
        </div>
        <div 
          className="text-xs px-2 py-1 rounded"
          style={{ 
            backgroundColor: theme.colors.primary,
            color: theme.colors.bgDark
          }}
        >
          Ejemplo
        </div>
      </div>
    </button>
  );
};

export default ThemePicker;
