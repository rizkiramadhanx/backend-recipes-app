import path from "path";
import multer from "multer";

const multerStorage = multer.diskStorage({
  // destination: "images",
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    const currentTime = new Date();
    cb(
      null,
      `images_${currentTime.getTime()}_${currentTime.getDate()}${currentTime.getMonth()}${currentTime.getFullYear()}`
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] == "image") {
    cb(null, true);
  } else {
    cb(
      new Error("File harus berupa gambar" + file.mimetype.split("/")[0]),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export default upload;
