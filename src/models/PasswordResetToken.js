// src/models/PasswordResetToken.js
import mongoose from "mongoose";

const passwordResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // Expira en 1 hora
});

export default mongoose.model("PasswordResetToken", passwordResetTokenSchema);
