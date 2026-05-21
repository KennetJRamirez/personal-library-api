import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateRequestMiddleware.js";
import {
  createUserSchema,
  updateUserSchema,
  updatePasswordSchema,
} from "../validators/userValidator.js";
const router = Router();

router.post("/", validateRequest(createUserSchema), userController.createUser); // Create a new user

router.get("/", userController.getAllUsers); // Get all users

router.get("/:id", userController.getUserById); // Get user by ID

router.patch(
  "/:id",
  validateRequest(updateUserSchema),
  userController.updateUser,
); // Update user

router.delete("/:id", userController.deleteUser); // Delete user

export default router;
