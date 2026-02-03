import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messagedRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/messages",messagedRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
 