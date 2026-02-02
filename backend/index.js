import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/formRoute.js";
import connectDb from "./utils/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ CORS (exact origin, no slash)
app.use(
  cors({
    origin: "https://google-form-vqwm.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Explicit preflight handling (THIS FIXES YOUR ERROR)
app.options("*", cors());

app.use(express.json());
app.use("/api", router);

// ✅ DB first, then server
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
