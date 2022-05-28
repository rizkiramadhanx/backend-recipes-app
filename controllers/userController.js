import express from "express";
import User from "../models/User.js";

export const addFavorite = async (req, res) => {
  const { id, favoriteId } = req.body;

  try {
    const user = await User.update(
      { _id: id },
      { $push: { favorites: [favoriteId] } }
    );

    res.status(201).json({ message: "Ditambahkan ke favorite" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFavorite = async (req, res) => {
  const { id, favoriteId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $pullAll: { favorites: [favoriteId] } },
      { new: true }
    );

    res.status(201).json({ message: "Menghapus dari favorite" });
  } catch (error) {
    console.log(error);
  }
};

export const getFavoriteById = async (req, res) => {
  const id = req.params.id;

  try {
    const favorite = await User.find({ _id: id }).populate("recipes");
    res.json({ favorite: favorite });
  } catch (error) {
    console.log(error);
  }
};
