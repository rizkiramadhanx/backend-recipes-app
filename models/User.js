import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipes",
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
