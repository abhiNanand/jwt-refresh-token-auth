import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/leannjwt")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

app.use("/user", userRouter);
app.use("/message",messageRouter);


app.get("/", (req, res) => {
  res.send("Hello from backend");
});


app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});