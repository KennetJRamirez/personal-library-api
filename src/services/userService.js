import { prisma } from "../config/db.js";
import { UserResponseDto, UserListDto } from "../dto/userDTO.js";
import { hashPassword } from "../utils/password.js";

class UserService {
  async createUser(data) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    const role = await prisma.role.findUnique({
      where: {
        name: "ROLE_USER",
      },
    });

    if (userAlreadyExists || !role) {
      throw new Error("Could not create user");
    }

    // Hash the password
    const hashedPassword = await hashPassword(data.password);

    // Create the user
    const user = await prisma.user.create({
      data: { ...data, roleId: role.id, password: hashedPassword },
    });

    return UserResponseDto(user);
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      where: {
        isActive: true,
      },
    });
    return users.map(UserListDto);
  }

  async getUserById(id) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
        isActive: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return UserResponseDto(user);
  }

  async updateUser(id, data) {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: data,
    });

    return UserResponseDto(updatedUser);
  }

  async deleteUser(id) {
    const user = await prisma.user.findFirst({
      where: { id: id, isActive: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const deletedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });

    return UserResponseDto(deletedUser);
  }
}

export default new UserService();
