import jwt from "jsonwebtoken";

export const verifyToken = (req, res, token) => {
  const tokenVerif = req.session.token;

  if (!tokenVerif) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(tokenVerif, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    res.send(decoded.id);
    next();
  });
};
