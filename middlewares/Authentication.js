import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const tokenVerif = req.session.token;

  if (!tokenVerif) {
    return res.status(403).send({ message: "Silahkan login kembali" });
  }

  jwt.verify(tokenVerif, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Silahkan login kembali" });
    }

    req.userId = decoded.id;
    next();
  });
};
