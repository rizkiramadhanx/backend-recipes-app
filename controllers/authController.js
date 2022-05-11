import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  res.status(201).json({
    message: "Register berhasil",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});
