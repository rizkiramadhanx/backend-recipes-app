import Recipes from "../models/Recipes.js";

export const addRecipe = async (req, res) => {
  try {
    const { name, description, tutorial, country, city } = req.body;
    const tag = req.body;

    const recipe = await Recipes.create({
      name,
      description,
      tutorial,
      origin: {
        country,
        city,
      },
    });

    res.status(201).json({
      message: "Data telah ditambahkan",
      data: {
        name: name,
        description: description,
        tutorial: tutorial,
        origin: {
          country: country,
          city: city,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
