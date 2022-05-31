import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }

  try {
    if (username) {
      if (hasWhiteSpace) {
        res.status(401).json({ message: "Username diisi tanpa spasi" });
        return;
      }
      const usernameValidation = await User.findOne({ username: username });
      if (usernameValidation) {
        res.status(401).json({ message: "Username Sudah terdaftar" });
        return;
      }
    }

    if (email) {
      const emailValidation = await User.findOne({ email: email });
      if (emailValidation) {
        res.status(401).json({ message: "Email Sudah terdaftar" });
        return;
      }
    }

    const user = await User.create({ username, email, password });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400,
    });

    req.session.token = token;
    res
      .status(201)
      .json({ message: "Anda berhasil register", data: user, token: token });
  } catch (error) {
    res.status(401).json({ message: "Pastikan semua form sudah diisi" });
  }
};

export const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(401).send({ message: "User tidak terdaftar" });
    }

    let passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res.status(401).send({ message: "Sandi tidak cocok" });
    }

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    req.session.token = token;

    res.status(200).json({
      message: "Login berhasil",
      data: user,
      token: token,
    });
  });
};

export const logout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "Anda telah logout !" });
  } catch (error) {
    this.next(error);
  }
};
