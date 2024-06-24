import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRoute from "./routes/user.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;
const app = express();
const PORT = 9000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to db!");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
app.get("/test", (req, res) => {
  res.send(`Welcome to test server!`);
});
app.get("/", (req, res) => {
  res.json({ message: "Server " });
});
app.use("/api", testRoute);
app.use("/api", userRouter);
app.use("/api", authRouter);
this;

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
