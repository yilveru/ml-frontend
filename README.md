# Frontend - Marketplace

Este es el repositorio del frontend de la aplicación Marketplace, construido con React y TypeScript.

## 🚀 Tecnologías utilizadas

- React con Vite
- TypeScript
- TailwindCSS
- React Router
- JWT para autenticación

## 📂 Estructura del proyecto

```
/ml-frontend
│-- src/
│   │-- components/     # Componentes reutilizables
│   │-- features/       # Funcionalidades como auth, productos, carrito
│   │-- pages/          # Páginas de la aplicación
│   │-- hooks/          # Hooks personalizados
│   │-- services/       # Llamadas a API
│   │-- App.tsx         # Componente principal
│-- public/             # Archivos estáticos
│-- index.html          # Punto de entrada HTML
│-- package.json        # Dependencias y scripts
│-- tsconfig.json       # Configuración TypeScript
```

## 📦 Instalación y configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/yilveru/ml-frontend.git
   cd ml-frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz con:
   ```env
   VITE_API_URL=https://tu-backend.com
   ```

## ▶️ Ejecución en desarrollo

Para correr el frontend en modo desarrollo:
```bash
npm run dev
```
El servidor se levantará en `http://localhost:5173`

## 🚀 Despliegue en GitHub Pages

1. Instalar `gh-pages` si no lo tienes:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Agregar en `package.json`:
   ```json
   "homepage": "https://yilveru.github.io/ml-frontend",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Ejecutar:
   ```bash
   npm run deploy
   ```

La app quedará disponible en `https://yilveru.github.io/ml-frontend`.