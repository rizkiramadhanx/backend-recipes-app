import Recipes from "../models/Recipes.js";
import User from "../models/User.js";

export const getAllRecipes = async (req, res) => {
  const category = req.query.category;

  if (category) {
    return res.status(200).json({ data: category });
  }
  try {
    const recipe = await Recipes.find().populate("author", "username -_id");

    res.status(200).json({ data: recipe });
  } catch (error) {
    console.log(error);
  }
};

export const addRecipe = async (req, res) => {
  try {
    const {
      name,
      description,
      tutorial,
      country,
      city,
      ingredients,
      timecook,
    } = req.body;
    const author = req.userId;

    const recipe = await Recipes.create({
      name,
      description,
      tutorial,
      origin: {
        country,
        city,
      },
      ingredients,
      timecook,
      author: author,
    });

    res.status(201).json({
      message: "Data telah ditambahkan",
      data: recipe,
    });
  } catch (error) {
    console.log(error);
  }
};

export const myFavoriteRecipes = async (req, res) => {
  const id = req.userId;
  try {
    User.findOne({ _id: id }, function (err, user) {
      Recipes.find({ _id: user.favorites }, "-__v")
        .populate("author", "username -_id")
        .exec(function (err, user) {
          res.status(200).json({ data: user });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchRecipes = async (req, res) => {
  const keywords = req.query.search;

  const data = await Recipes.find({
    name: new RegExp(keywords, "i"),
  }).populate("author", "username -_id");

  if (!data[0]) {
    res.status(200).json({
      message: "Data tidak ditemukan",
      data: data,
    });
    return;
  }
  res.status(200).json({
    message: "Data ditemukan",
    data: data,
  });
};

export const favoriteRecipesByUsername = async (req, res) => {
  const username = req.params.username;
  try {
    const data = await User.findOne(
      { username: username },
      "-password -__v"
    ).populate("favorites", "-__v");
    res.status(200).json({ data: data.favorites });
  } catch (error) {
    console.log(error);
  }
};
