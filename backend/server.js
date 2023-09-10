import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import colors from "colors";
import { connectDb } from "./config/db.js";
import UserRoutes from "./routes/usersRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

//Routes
app.use("/api/users", UserRoutes);
app.use("/api/goals", goalRoutes);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`App configured on port: http://localhost:${port}`.cyan.underline)
);
