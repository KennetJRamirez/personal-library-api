import { prisma } from "../config/db.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
  async login(email, password) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        isActive: true,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatchPassword = await comparePassword(password, user.password);

    if (!isMatchPassword) {
      throw new Error("Invalid email or password");
    }

    const lastLogin = new Date();

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: lastLogin,
      },
    });

    const token = generateToken({
      id: user.id,
      role: user.role.name,
    });

    return token;
  }
}

export default new AuthService();
