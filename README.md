# CALQ - Intelligent Math Flow

<div align="center">

![CALQ Logo](https://img.shields.io/badge/CALQ-Intelligent%20Flow-00D9FF?style=for-the-badge&logo=react&logoColor=white)

**Una calculadora matemática inteligente con interfaz de chat**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/calq)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev/)

[Demo en vivo](https://calq.vercel.app) • [Reportar Bug](https://github.com/tu-usuario/calq/issues) • [Solicitar Feature](https://github.com/tu-usuario/calq/issues)

</div>

---

## ✨ Características

- 🧮 **Motor Matemático Potente**: Powered by [mathjs](https://mathjs.org/) para cálculos avanzados
- 💬 **Interfaz de Chat**: Conversación natural con la calculadora
- 💾 **Persistencia**: Guarda tu historial y variables automáticamente
- 🎨 **Diseño Moderno**: Neumorphic design con modo oscuro elegante
- ⚡ **Ultra Rápida**: Construida con Vite y React 18
- 📱 **PWA Ready**: Instálala como app nativa en tu dispositivo
- 🔒 **Segura**: Headers de seguridad y sanitización de inputs
- ♿ **Accesible**: Diseño pensado en la accesibilidad

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+ 
- npm o yarn

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/calq.git
cd calq

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

## 📖 Uso

### Operaciones Básicas

```
> 2 + 2
4

> sqrt(16)
4

> sin(pi/2)
1
```

### Variables

```
> precio = 100
✓ Variable guardada: 100

> impuesto = precio * 0.21
✓ Variable guardada: 21

> total = precio + impuesto
✓ Variable guardada: 121
```

### Funciones

```
> f(x) = x^2 + 2x + 1
✓ Función definida: f(x)

> f(5)
36
```

### Atajos de Teclado

- `↑` `↓` - Navegar por el historial de comandos
- `Ctrl + L` - Limpiar historial (próximamente)
- `Enter` - Enviar operación

## 🛠️ Stack Tecnológico

- **Framework**: [React 18.2](https://reactjs.org/)
- **Build Tool**: [Vite 5.0](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS 3.3](https://tailwindcss.com/)
- **Motor Matemático**: [mathjs 12.0](https://mathjs.org/)
- **Iconos**: [Lucide React](https://lucide.dev/)

## 📁 Estructura del Proyecto

```
calq/
├── public/              # Assets estáticos
│   ├── favicon.ico
│   ├── site.webmanifest
│   └── ...
├── src/
│   ├── components/      # Componentes React
│   │   ├── ChatMessage.jsx
│   │   └── ConfirmModal.jsx
│   ├── utils/           # Utilidades
│   │   └── mathLogic.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json          # Configuración de despliegue
└── README.md
```

## 🚢 Despliegue en Vercel

### Deploy Automático

1. Haz fork del repositorio
2. Conecta tu cuenta de GitHub con Vercel
3. Importa el proyecto en Vercel
4. ¡Listo! El deploy es automático en cada push

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Variables de Entorno

No se requieren variables de entorno para esta aplicación.

## 🧪 Testing

```bash
# Ejecutar tests (próximamente)
npm test

# Coverage
npm run test:coverage
```

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [x] Interfaz de chat básica
- [x] Persistencia en localStorage
- [x] Historial de comandos
- [x] Variables y funciones
- [ ] Tests unitarios y E2E
- [ ] Modo claro/oscuro toggle
- [ ] Exportar historial
- [ ] Gráficas de funciones
- [ ] Multi-idioma (i18n)
- [ ] Themes personalizables

## 🐛 Problemas Conocidos

Ninguno por el momento. [Reporta uno](https://github.com/tu-usuario/calq/issues)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Twitter: [@tu-twitter](https://twitter.com/tu-twitter)

## 🙏 Agradecimientos

- [mathjs](https://mathjs.org/) por el increíble motor matemático
- [Lucide](https://lucide.dev/) por los hermosos iconos
- [Tailwind CSS](https://tailwindcss.com/) por el framework de estilos

---

<div align="center">

Hecho con ❤️ y ☕

[⬆ Volver arriba](#calq---intelligent-math-flow)

</div>
