import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRouter from "./routes/authRoute.js";
import recipesRouter from "./routes/recipesRoute.js";
import userRouter from "./routes/userRoute.js";
import cookieSession from "cookie-session";

import cloudinary from "./utils/cloudinary.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

// Test Server

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(
  cookieSession({
    name: "rizki",
    secret: "COOKIE_RAHASIA",
    httpOnly: true,
  })
);

// auth route
app.use("/api/auth", authRouter);

// recipes route
app.use("/api/recipes", recipesRouter);

// user favorite
app.use("/api/user", userRouter);

app.listen(PORT, console.log(`Server is running on ${PORT}`));
