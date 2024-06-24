import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import testRoute from "./routes/user.route.js";
import userRouter from "./routes/user.route.js"
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
app.listen(PORT, (req,res) => {
  console.log(`Server running on ${PORT}`);
});
app.get("/test", (req, res) => {
  res.send(`Welcome to test server!`);
});
app.get("/", (req, res) => {
  res.json({ message: "Server " });
});
app.use("/api",testRoute);
app.use("/api",userRouter);
