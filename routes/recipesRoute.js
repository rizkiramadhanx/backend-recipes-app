import express from "express";
import {
  addRecipe,
  editRecipes,
  favoriteRecipesByUsername,
  getAllRecipes,
  getAllRecipesByCategory,
  myFavoriteRecipes,
  myRecipes,
  searchRecipes,
} from "../controllers/recipesController.js";
import { DataSpecificById } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

// router.route("/all").get(searchRecipes);
router.route("/all").get(getAllRecipes);
router.route("/add").post([verifyToken], addRecipe);
router.route("/favorite").get([verifyToken], myFavoriteRecipes);
router.route("/favorite/:username").get(favoriteRecipesByUsername);
router.route("/category/:category").get(getAllRecipesByCategory);
router.route("/my").get([verifyToken], myRecipes);
router.route("/my/:idRecipe").put([verifyToken], editRecipes);
router.route("/my").get([verifyToken], myRecipes);

export default router;
