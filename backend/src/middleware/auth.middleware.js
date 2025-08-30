import jwt from "jsonwebtoken";
import { accessTokenSecret} from "../controller/user.controller.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer token" format
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token expired or invalid" });
      }
      req.user = decoded; // decoded payload (id, name) //jo hamney payload deya tha whi hai ye decoded me
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Auth failed", error: err.message });
  }
};
