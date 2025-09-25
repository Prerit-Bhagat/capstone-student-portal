import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/middlewares/error-handler.js";
import { connectDB } from "@/config/db.js";
import { authRouter } from "@/routes/auth.js";
import { studentRouter } from "@/routes/student.js";

const app = express();
dotenv.config({ path: ".env", quiet: true });
await connectDB();

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL_DEV}`, `${process.env.FRONTEND_URL_PROD}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("This app was created using npx create-types-backend@latest !");
});

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
