import express from "express";
import { addRecipe } from "../controllers/recipesController.js";

const router = express.Router();

router.route("/all").post(addRecipe);

export default router;
