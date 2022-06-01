import express from "express";
import {
  addFavorite,
  DataSpecificById,
  deleteFavorite,
  getFavoriteById,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/all/:idUser").get(DataSpecificById);
router.route("/all/:idUser/favorite").get(getFavoriteById);
router.route("/my").get(DataSpecificById);
router.route("/my").put(DataSpecificById);
router.route("/my").delete(DataSpecificById);
router.route("/favorite/add").post(addFavorite);
router.route("/favorite/delete").post(deleteFavorite);

export default router;
