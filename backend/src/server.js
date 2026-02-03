import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messagedRoutes from "./routes/message.route.js";
import connectDb from "./lib/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json()); //req.body

app.use("/api/auth", authRoutes);
app.use("/api/messages",messagedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
 