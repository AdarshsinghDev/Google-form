import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import formRouter from "./routes/formRoute.js";
import authRouter from "./routes/authRoute.js";
import connectDb from "./utils/db.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });