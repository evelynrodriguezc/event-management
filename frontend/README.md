# TechPoint Frontend

Interfaz de usuario para TechPoint, desarrollada con React y React Bootstrap.

## Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AllEvents.js
│   │   ├── EventForm.js
│   │   ├── Footer.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── MyEvents.js
│   │   └── Register.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Configuración del Entorno

1. Crea un archivo `.env` en la raíz del frontend:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

2. Instala las dependencias:
```bash
npm install
```

## Scripts Disponibles

- `npm start`: Inicia la aplicación en modo desarrollo
- `npm build`: Compila la aplicación para producción
- `npm test`: Ejecuta los tests

## Componentes Principales

### Pages
- `Home`: Página principal con carrusel de eventos
- `AllEvents`: Lista de todos los eventos
- `MyEvents`: Gestión de eventos del usuario
- `EventForm`: Formulario para crear/editar eventos

### Components
- `Login`: Modal de inicio de sesión
- `Register`: Modal de registro
- `Footer`: Pie de página común

## Características del Frontend

- Diseño responsive
- Efectos visuales modernos (glassmorphism)
- Gestión de estado con React Hooks
- Manejo de rutas protegidas
- Notificaciones toast para feedback
- Modales de confirmación personalizados

## Dependencias Principales

- react
- react-bootstrap
- react-router-dom
- axios
- react-toastify
- lucide-react
