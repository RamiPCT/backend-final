import { sendRecoveryEmail } from "../utils/mailer.js";
import { resetUserPassword } from "../services/user.service.js";
import UserRepository from "../dao/repositories/user.repository.js";
const userRepo = new UserRepository();

// Solicita recuperación
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await userRepo.getByEmail(email);
  if (!user) return res.status(404).send({ message: "User not found" });

  const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "1h" });
  await sendRecoveryEmail(email, token);
  res.send({ message: "Email sent" });
});

// Cambia la contraseña
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    await resetUserPassword(decoded.id, newPassword);
    res.send({ message: "Password updated" });
  } catch (err) {
    res.status(400).send({ message: "Invalid or expired token" });
  }
});
