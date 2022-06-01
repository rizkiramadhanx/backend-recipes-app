import Recipes from "../models/Recipes.js";
import User from "../models/User.js";

export const getAllRecipes = async (req, res) => {
  let category = req.query.category;
  let search = req.query.search;

  if (category || search) {
    if (!search) search = 0;
    if (!category) category = 0;
    const data = await Recipes.find({
      $or: [
        {
          name: new RegExp(search, "i"),
        },
        {
          category: new RegExp(category, "i"),
        },
      ],
    }).populate("author", "username -_id");

    if (!data[0]) {
      return res.status(200).json({ message: "Data tidak ditemukan" });
    }

    return res.status(200).json({ data: data });
  } else {
    const data = await Recipes.find({}, "-__v").populate(
      "author",
      "username -_id"
    );

    if (data) {
      return res.status(200).json({ message: "Data ditemukan", data: data });
    }
    return res.status(200).json({ message: "Data tidak ditemukan" });
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
      category,
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
      category,
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

export const getAllRecipesByCategory = (req, res) => {
  const category = req.params.category;

  Recipes.find({ category: category }).exec((err, Recipes) => {
    if (err) return res.status(401);
    if (!Recipes[0]) {
      return res.status(200).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data ditemukan", data: Recipes });
  });
};

export const myRecipes = (req, res) => {
  const id = req.userId;

  Recipes.find({ author: id }, "-__v")
    .populate("author", "username")
    .exec(function (err, Recipes) {
      if (err) res.status(401);

      res.status(200).json({ message: "Data ditemukan", data: Recipes });
    });
};

export const editRecipe = async (req, res) => {
  const {
    name,
    description,
    tutorial,
    country,
    city,
    ingredients,
    timecook,
    category,
  } = req.body;

  const idRecipe = req.params.idRecipe;

  if (!idRecipe) {
    res.status(200).json({ message: "Kamu tidak mempunyai akses ini" });
  }

  Recipes.findOne({ _id: idRecipe }, "-__v")
    .populate("author")
    .exec(async function (err, recipes) {
      if (err) return res.status(401).json({ message: err });

      const hasAuth = recipes.author._id == req.userId;

      if (!hasAuth) {
        return res
          .status(401)
          .json({ message: "Kamu tidak mempunyai akses ini" });
      }

      const data1 = await Recipes.findById(recipes.id);
      Recipes.findOneAndUpdate(
        recipes.id,
        {
          name,
          description,
          tutorial,
          country,
          city,
          ingredients,
          timecook,
          category,
        },
        function (err, data) {
          return res.status(201).json({ message: "Data sudah terupdate" });
        }
      );
    });
};

export const getRecipe = (req, res) => {
  const id = req.params.idRecipe;

  Recipes.findOne({ _id: id }).exec(function (err, recipe) {
    if (!recipe) {
      return res.status(401).json({ message: "data tidak ditemukan" });
    }
    res.status(200).json({
      message: "data ditemukan",
      data: recipe,
    });
    return;
  });
};

export const deleteRecipe = (req, res) => {
  const idRecipe = req.params.idRecipe;

  if (!idRecipe) {
    res.status(200).json({ message: "Kamu tidak mempunyai akses ini" });
  }

  Recipes.findOne({ _id: idRecipe }, "-__v")
    .populate("author")
    .exec(async function (err, recipes) {
      if (err) return res.status(401).json({ message: err });

      if (!recipes) return res.status(401).json({ message: "Alamat salah" });

      // return res.send(recipes);
      const hasAuth = recipes.author._id == req.userId;

      if (!hasAuth) {
        return res
          .status(401)
          .json({ message: "Kamu tidak mempunyai akses ini" });
      }

      Recipes.findByIdAndDelete(recipes.id, function (err, data) {
        User.find({}, async function (err, user) {
          let data = user.filter((car) => car.favorites.includes(idRecipe));

          let filterdata = data.map((e) => e._id);

          const user1 = await User.updateMany(
            { _id: { $in: filterdata } },
            {
              $pullAll: {
                favorites: [{ _id: idRecipe }],
              },
            }
          );
          return res
            .status(201)
            .json({ message: "Data sudah terhapus", data: user1 });
        });
      });
    });
};
