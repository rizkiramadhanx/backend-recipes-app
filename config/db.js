import mongoose from "mongoose";

const connectDB = async () => {
  const url = process.env.MONGO_URI;
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/", {
      dbName: "recipes",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Databases Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
