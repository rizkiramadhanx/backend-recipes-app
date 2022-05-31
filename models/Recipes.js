import mongoose from "mongoose";

const RecipesSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
    origin: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    tutorial: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 30,
    },
    ingredients: {
      type: String,
    },
    timecook: {
      type: Number,
      required: true,
    },
    tutorial: {
      type: String,
      required: true,
      min: 30,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RecipesSchema.pre("save", function (next) {
  this.category = this.category.toLowerCase();
  if (!this.isModified("category")) {
    next();
  }
  next();
});

const Recipes = mongoose.model("Recipes", RecipesSchema);

export default Recipes;
