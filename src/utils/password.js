import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = parseInt(process.env.SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
