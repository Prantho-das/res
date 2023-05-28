import dotEnv from "dotenv";
import express from "express";
import apiRouter from "./routes/api.js";
import { HomeController } from "./app/controller/HomeController.js";
import mongoose from "mongoose";
import { connectDB } from "./app/config/db.js";
import Product from "./database/models/ProductModel.js";
dotEnv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.get("/", HomeController.index);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: err.message,
  });
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.listen(PORT, async () => {
  await connectDB();
 
  console.log(`Server is running on port ${PORT}`);
});
