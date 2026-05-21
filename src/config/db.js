import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.info("Connected to the database successfully");
  } catch (error) {
    console.error(`Error connecting to the database ${error}`);
  }
};
