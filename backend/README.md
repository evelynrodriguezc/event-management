# TechPoint Backend

API REST para la gestión de eventos de TechPoint, desarrollada con Node.js, Express y MongoDB.

## Estructura del Proyecto

```
backend/
├── config/
├── controllers/
│   ├── eventController.js
│   └── authController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Event.js
│   └── User.js
├── routes/
│   ├── events.js
│   └── auth.js
└── server.js
```

## Configuración del Entorno

1. Crea un archivo `.env` en la raíz del backend con las siguientes variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/techpoint
JWT_SECRET=tu_secret_key
```

2. Instala las dependencias:
```bash
npm install
```

## Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción
- `npm run dev`: Inicia el servidor en modo desarrollo con nodemon

## Endpoints API

### Autenticación

- `POST /api/auth/register`: Registro de usuario
- `POST /api/auth/login`: Inicio de sesión

### Eventos

- `GET /api/events`: Obtener todos los eventos
- `GET /api/events/:id`: Obtener un evento específico
- `POST /api/events`: Crear nuevo evento (requiere autenticación)
- `PUT /api/events/:id`: Actualizar evento (requiere autenticación)
- `DELETE /api/events/:id`: Eliminar evento (requiere autenticación)

## Modelos de Datos

### Usuario
```javascript
{
  name: String,
  email: String,
  password: String
}
```

### Evento
```javascript
{
  name: String,
  date: Date,
  time: String,
  location: String,
  description: String,
  creator: ObjectId
}
```

## Dependencias Principales

- express
- mongoose
- jsonwebtoken
- bcryptjs
- dotenv
- cors
