# TechPoint - Plataforma de Gestión de Eventos

TechPoint es una plataforma web para la gestión y descubrimiento de eventos de tecnología e innovación en Latinoamérica. Permite a los usuarios crear, administrar y descubrir eventos como conferencias, meetups, workshops y hackathons.

## Características Principales

- 🔐 Autenticación de usuarios
- 📅 Creación y gestión de eventos
- 🔍 Filtrado de eventos por fecha y ubicación
- 👥 Visualización de eventos públicos
- ⚡ Interfaz moderna y responsive

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `/frontend`: Aplicación cliente desarrollada en React
- `/backend`: API REST desarrollada en Node.js

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Inicio Rápido

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/techpoint.git
cd techpoint
```

2. Instala las dependencias del backend:
```bash
cd backend
npm install
```

3. Instala las dependencias del frontend:
```bash
cd frontend
npm install
```

4. Configura las variables de entorno:
   - Crea un archivo `.env` en la carpeta backend (ver instrucciones en el README del backend)
   - Crea un archivo `.env` en la carpeta frontend (ver instrucciones en el README del frontend)

5. Inicia el servidor y el cliente:
```bash
# En /backend
npm run dev

# En /frontend
npm start
```

## Documentación Detallada

- [Documentación del Frontend](/frontend/README.md)
- [Documentación del Backend](/backend/README.md)

## Tecnologías Utilizadas

### Frontend
- React
- React Bootstrap
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JWT

## Licencia

Este proyecto está bajo la Licencia MIT.
