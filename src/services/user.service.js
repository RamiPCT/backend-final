import bcrypt from "bcrypt";
import UserRepository from "../dao/repositories/user.repository.js";

const userRepo = new UserRepository();

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const registerUser = async (userData) => {
  const existing = await userRepo.getByEmail(userData.email);
  if (existing) throw new Error("User already exists");

  userData.password = createHash(userData.password);
  userData.role = "user";
  return await userRepo.create(userData);
};

export const loginUser = async (email, password) => {
  const user = await userRepo.getByEmail(email);
  if (!user) throw new Error("User not found");
  if (!isValidPassword(user, password)) throw new Error("Invalid password");
  return user;
};

export const resetUserPassword = async (userId, newPassword) => {
  const user = await userRepo.getById(userId);
  if (isValidPassword(user, newPassword)) throw new Error("New password must be different");
  const hashed = createHash(newPassword);
  return await userRepo.updatePassword(userId, hashed);
};
