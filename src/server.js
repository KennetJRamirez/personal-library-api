import app from "./app.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.info(`Server is running on port ${PORT} `);
    });
  } catch (error) {
    console.error(`Error starting the server ${error}`);
  }
};

startServer();
