/**
 * Configuración de Temas para CALQ
 * 5 temas personalizables con paletas de colores completas
 */

export const themes = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Tema cyan clásico de CALQ',
    colors: {
      primary: '#06b6d4',
      primaryDark: '#0891b2',
      primaryLight: '#22d3ee',
      bgDark: '#0f172a',
      bgDarkSecondary: '#1e293b',
      bgLight: '#ffffff',
      bgLightSecondary: '#f8fafc',
      textDark: '#e2e8f0',
      textLight: '#0f172a',
      accent: '#0891b2',
      accentHover: '#06b6d4',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    }
  },

  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon pink y cyan futurista',
    colors: {
      primary: '#ff0080',
      primaryDark: '#cc0066',
      primaryLight: '#ff33a1',
      bgDark: '#0a0015',
      bgDarkSecondary: '#1a0a2e',
      bgLight: '#fafaff',
      bgLightSecondary: '#f0ecff',
      textDark: '#e0e0ff',
      textLight: '#1a0a2e',
      accent: '#00ffff',
      accentHover: '#33ffff',
      success: '#00ff88',
      error: '#ff0055',
      warning: '#ffaa00',
    }
  },

  nord: {
    id: 'nord',
    name: 'Nord',
    description: 'Azul gris escandinavo',
    colors: {
      primary: '#88c0d0',
      primaryDark: '#5e81ac',
      primaryLight: '#8fbcbb',
      bgDark: '#2e3440',
      bgDarkSecondary: '#3b4252',
      bgLight: '#eceff4',
      bgLightSecondary: '#e5e9f0',
      textDark: '#d8dee9',
      textLight: '#2e3440',
      accent: '#81a1c1',
      accentHover: '#88c0d0',
      success: '#a3be8c',
      error: '#bf616a',
      warning: '#ebcb8b',
    }
  },

  dracula: {
    id: 'dracula',
    name: 'Dracula',
    description: 'Morado oscuro vampírico',
    colors: {
      primary: '#bd93f9',
      primaryDark: '#9580ff',
      primaryLight: '#d4bfff',
      bgDark: '#282a36',
      bgDarkSecondary: '#21222c',
      bgLight: '#f8f8f2',
      bgLightSecondary: '#f0f0eb',
      textDark: '#f8f8f2',
      textLight: '#282a36',
      accent: '#ff79c6',
      accentHover: '#ff92d0',
      success: '#50fa7b',
      error: '#ff5555',
      warning: '#f1fa8c',
    }
  },

  highContrast: {
    id: 'highContrast',
    name: 'High Contrast',
    description: 'Máximo contraste para accesibilidad',
    colors: {
      primary: '#ffff00',
      primaryDark: '#ffcc00',
      primaryLight: '#ffff33',
      bgDark: '#000000',
      bgDarkSecondary: '#1a1a1a',
      bgLight: '#ffffff',
      bgLightSecondary: '#f5f5f5',
      textDark: '#ffffff',
      textLight: '#000000',
      accent: '#00ff00',
      accentHover: '#33ff33',
      success: '#00ff00',
      error: '#ff0000',
      warning: '#ffff00',
    }
  }
};

export const getTheme = (themeId) => {
  return themes[themeId] || themes.default;
};

export const themeList = Object.values(themes);
