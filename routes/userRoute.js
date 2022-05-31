import express from "express";
import {
  addFavorite,
  DataSpecificById,
  deleteFavorite,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/:idUser").get(DataSpecificById);
router.route("/favorite/add").post(addFavorite);
router.route("/favorite/delete").post(deleteFavorite);

export default router;
