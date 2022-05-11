import moongose from "mongoose";

const RecipesSchema = moongose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Recipes = moongose.model("Recipes", RecipesSchema);

export default Recipes;
