const fs = require('fs');
const path = require('path');

const appFile = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appFile, 'utf8');

// 1. Agregar import getTheme después de línea 15
const importLine = "import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';";
const newImport = importLine + "\nimport { getTheme } from './config/themes';";
content = content.replace(importLine, newImport);

// 2. Agregar selectedTheme al destructuring del store (después de theme,)
const storeDestructStart = 'const { \r\n    theme,';
const storeDestructNew = 'const { \r\n    theme,\r\n    selectedTheme,';
content = content.replace(storeDestructStart, storeDestructNew);

// 3. Agregar effect CSS variables después del effect de tema (después de línea 119)
const themeEffect = `  // Aplicar tema
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);`;

const newEffects = `  // Aplicar tema
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Aplicar colores del tema seleccionado
  useEffect(() => {
    const themeConfig = getTheme(selectedTheme);
    const root = document.documentElement;
    
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(\`--calq-color-\${key}\`, value);
    });
  }, [selectedTheme]);`;

content = content.replace(themeEffect, newEffects);

// Escribir archivo modificado
fs.writeFileSync(appFile, content, 'utf8');
console.log('✅ App.jsx modificado correctamente');
console.log('Cambios aplicados:');
console.log('1. Import getTheme agregado');
console.log('2. selectedTheme en destructuring');
console.log('3. Effect CSS variables agregado');
