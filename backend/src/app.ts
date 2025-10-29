import express, { type Request, type Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "@/middlewares/error-handler.js";
import { connectDB } from "@/config/db.js";
import { authRouter } from "@/routes/auth.js";
import { studentRouter } from "@/routes/student.js";
import { doctorRouter } from "@/routes/doctor.js";
import { appointmentRouter } from "@/routes/appointment.js";
import { availabilityRouter } from "@/routes/availability.js";

const app = express();
configDotenv({ path: ".env", quiet: true });
await connectDB();

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL_DEV}`, `${process.env.FRONTEND_URL_PROD}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("This app was created using npx create-types-backend@latest !");
});

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointmentRouter);
app.use("/api/availability", availabilityRouter);

app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
