import mongoose from "mongoose";

let isConnected = false; // Track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log("MongoDB is connected successfully!");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "uerjshop", // Somente isso é necessário
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};
