import mongoose from "mongoose";

export async function connectDB() {
  try {
    const MONGO_URL = process.env.MONGO_URL || "";

    if (MONGO_URL) {

      mongoose.connect(MONGO_URL);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        console.log("MongoDB Connected");
      })
      connection.on("error", (err) => {
        console.log("MongoDB Connection Error", err);
        process.exit()
      })
    } else {
      console.log("MONGO_URL not found");
    }
  } catch (error) {
    console.log("Something went wrong in connecting DB....", error);
  }
}