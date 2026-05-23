import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        isActive: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Unauthorized",
      });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Unauthorized",
    });
  }
};
