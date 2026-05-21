import app from "./app.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/users", userRoutes);

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
