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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="glass-effect border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Elige tu Tema</h2>
            <p className="text-slate-400 text-sm mt-1">Personaliza los colores de CALQ</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Lista vertical con scroll */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-2">
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
        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300
        ${isSelected 
          ? 'border-cyan-500 bg-slate-800/70 shadow-lg shadow-cyan-500/20' 
          : 'border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50'
        }
        ${isHovered ? 'scale-[1.02]' : ''}
      `}
    >
      {/* Círculos de colores */}
      <div className="flex gap-2 shrink-0">
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

      {/* Info del tema */}
      <div className="flex-1 text-left">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          {theme.name}
          {isSelected && (
            <div className="bg-cyan-500 rounded-full p-1">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </h3>
        <p className="text-slate-400 text-sm">{theme.description}</p>
      </div>

      {/* Preview mini */}
      <div 
        className="rounded-lg p-3 border border-white/10 shrink-0"
        style={{ backgroundColor: theme.colors.bgDark }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <span className="text-xs font-bold" style={{ color: theme.colors.textDark }}>Q</span>
          </div>
          <span className="text-xs font-semibold" style={{ color: theme.colors.textDark }}>CALQ</span>
        </div>
      </div>
    </button>
  );
};

export default ThemePicker;
