import { User } from "../model/user.model.js";
import { verifyPassowordAndGenerateToken } from "../controller/user.controller.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/login", async(req, res) => {
  const { email, password } = req.body;
  try {
    const {accessToken, refreshToken} = await verifyPassowordAndGenerateToken(email , password);
    res.cookie("refreshToken",refreshToken,{
      httpOnly: true,
    });
    res.status(200).json({token:accessToken});
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
});

export default router;
