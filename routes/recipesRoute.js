import express from "express";
import {
  addRecipe,
  favoriteRecipesByUsername,
  getAllRecipes,
  myFavoriteRecipes,
  searchRecipes,
} from "../controllers/recipesController.js";
import { DataSpecificById } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authentication.js";

const router = express.Router();

router.route("/all").get(searchRecipes);
router.route("/all").get(getAllRecipes);
router.route("/add").post([verifyToken], addRecipe);
router.route("/favorite").get([verifyToken], myFavoriteRecipes);
router.route("/favorite").get([verifyToken], myFavoriteRecipes);
router.route("/favorite/:username").get(favoriteRecipesByUsername);

export default router;
