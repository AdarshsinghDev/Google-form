import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import router from "./routes/formRoute.js";
import connectDb from "./utils/db.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://google-form-vqwm.vercel.app/",
    credentials: true
}));

app.use("/api", router);

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on Port: ${PORT}`)
})