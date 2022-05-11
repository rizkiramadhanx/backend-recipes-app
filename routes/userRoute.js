import express from "express";
import {
  addFavorite,
  deleteFavorite,
  getFavoriteById,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/favorite/add").post(addFavorite);
router.route("/favorite/delete").post(deleteFavorite);
router.route("/favorite/:id").get(getFavoriteById);

export default router;
