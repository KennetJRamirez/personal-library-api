import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().trim().min(3).max(30),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(100),
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  profileImage: z.url().startsWith("https://").optional(),
  bio: z.string().trim().max(200).optional(),
});

export const updateUserSchema = z
  .object({
    username: z.string().trim().min(3).max(30).optional(),
    email: z.email().trim().toLowerCase().optional(),
    firstName: z.string().trim().min(2).max(100).optional(),
    lastName: z.string().trim().min(2).max(100).optional(),
    profileImage: z.url().startsWith("https://").optional(),
    bio: z.string().trim().max(200).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
});
