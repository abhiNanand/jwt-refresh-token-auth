import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import Message from "../model/message.model.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;
  try {
    const userId = req.user.id;
    const saveMessage = await Message.create({ message, userId });
    res.status(201).json({ message: saveMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


 router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.aggregate([
      {
        $group: {
          _id: "$userId",
          messages: { $push: { _id: "$_id", message: "$message", createdAt: "$createdAt" } },
        },
      },
      {
        $lookup: {
          from: "users", // MongoDB collection name (usually lowercase plural of model)
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          name: "$user.name",
          messages: 1,
        },
      },
    ]);

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
