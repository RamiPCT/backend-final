import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { sendRecoveryEmail } from "../utils/mailer.js";
import { resetUserPassword } from "../services/user.service.js";
import UserRepository from "../dao/repositories/user.repository.js";

const userRepo = new UserRepository();

// Pedir recuperación de contraseña
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userRepo.getByEmail(email);
    if (!user) return res.status(404).send({ message: "User not found" });

    // Generar token JWT que expira en 1 hora
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "1h" });

    // Enviar email con el token
    await sendRecoveryEmail(email, token);

    res.send({ message: "Email sent" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Cambiar la contraseña
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Verificar token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Obtener usuario
    const user = await userRepo.getById(decoded.id);
    if (!user) return res.status(404).send({ message: "User not found" });

    // Validar que la nueva contraseña no sea igual a la anterior
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) return res.status(400).send({ message: "New password cannot be the same as the old one" });

    // Actualizar contraseña usando tu servicio
    await resetUserPassword(user._id, newPassword);

    res.send({ message: "Password updated" });
  } catch (err) {
    res.status(400).send({ message: "Invalid or expired token" });
  }
});
