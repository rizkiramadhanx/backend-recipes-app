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
  const id = req.params.idUser;

  try {
    const user = await User.findOne({ _id: id }).populate("favorites");
    return res.status(200).json({ data: user.favorites });
  } catch (error) {
    console.log(error);
  }
};

export const DataSpecificById = async (req, res) => {
  const id = req.params.idUser;
  try {
    const data = await User.findOne({ _id: id }, "-password").populate(
      "favorites"
    );
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
};
