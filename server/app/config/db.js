import mongoose from "mongoose";

export const connectDB = async () => {
  let DB_URL = process.env.DB_URL || "mongodb://localhost:27017/restaurant_db";

  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log("MongoDB Error: ", error.message);
    console.log(error.message);
  } 
};
