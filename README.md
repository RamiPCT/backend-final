# Ecommerce Backend

Proyecto backend para un ecommerce, desarrollado con Node.js, Express, MongoDB y Passport para autenticación.

---

## Tecnologías

- Node.js & Express
- MongoDB + Mongoose
- Passport.js (local y JWT)
- JWT para autenticación y autorización
- Nodemailer para recuperación de contraseña
- Arquitectura con Repository, DAO y DTO
- Manejo de roles (usuario, admin)
- Middleware de autorización por roles

---

## Funcionalidades principales

- Registro y login con encriptación de contraseñas (bcrypt)
- Autenticación con JWT y cookies HttpOnly
- Endpoint `/current` devuelve datos del usuario sin información sensible (usando DTO)
- Recuperación de contraseña:
  - Solicitud envía email con link que expira en 1 hora
  - Reset de contraseña validando token y evitando reutilizar contraseña anterior
- Middleware para proteger rutas según rol:
  - Solo admin puede crear/editar/eliminar productos
  - Solo usuario puede agregar productos a su carrito
- Lógica robusta para proceso de compra y generación de tickets

---

## Variables de entorno (.env)

```env
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=8080
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_password
FRONTEND_URL=http://localhost:3000
