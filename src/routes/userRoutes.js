import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateRequestMiddleware.js";
import {
  createUserSchema,
  updateUserSchema,
  updatePasswordSchema,
} from "../validators/userValidator.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { verifyRole } from "../middlewares/roleMiddleware.js";
import { registerLimiter } from "../middlewares/registerRateLimitMiddleware.js";

const router = Router();

router.post(
  "/",
  registerLimiter,
  validateRequest(createUserSchema),
  userController.createUser,
); // Create a new user

router.get(
  "/",
  verifyToken,
  verifyRole("ROLE_ADMIN"),
  userController.getAllUsers,
); // Get all users

router.get("/me", verifyToken, userController.getUserById); // Get user by ID

router.patch(
  "/me",
  verifyToken,
  validateRequest(updateUserSchema),
  userController.updateUser,
); // Update user

router.delete(
  "/:id",
  verifyToken,
  verifyRole("ROLE_ADMIN"),
  userController.deleteUser,
); // Delete user

export default router;
