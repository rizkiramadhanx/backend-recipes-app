import express from "express";
import {
  addRecipe,
  editRecipe,
  favoriteRecipesByUsername,
  getAllRecipes,
  getAllRecipesByCategory,
  getRecipe,
  myFavoriteRecipes,
  myRecipes,
  deleteRecipe,
  // searchRecipes,
} from "../controllers/recipesController.js";
import { DataSpecificById } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authentication.js";
import upload from "../utils/multer.js";

const router = express.Router();

// router.route("/all").get(searchRecipes);
router.route("/all").get(getAllRecipes);
router.route("/add").post([verifyToken, upload.single("image")], addRecipe);
router.route("/favorite").get([verifyToken], myFavoriteRecipes);
router.route("/favorite/:username").get(favoriteRecipesByUsername);
router.route("/category/:category").get(getAllRecipesByCategory);
router.route("/my").get([verifyToken], myRecipes);
router
  .route("/recipe/:idRecipe")
  .put([verifyToken, upload.single("image")], editRecipe);
router.route("/recipe/:idRecipe").delete([verifyToken], deleteRecipe);
router.route("/recipe/:idRecipe").get(getRecipe);

export default router;
