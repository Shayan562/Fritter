// console.log("Test Run");
import express from "express";
// const express = require("express");
import { messageRouter } from "./Routes/messageRoute.js";
import { postRouter } from "./Routes/postRoute.js";
import { userRouter } from "./Routes/userRoute.js";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());
app.use((err,req,res,next)=>{
  console.log(err.stack);
  res.status.send('Some Error Occured');
})
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/message",messageRouter);

app.get("/", (req, res) => {
  // console.log("Req received")
  return res.status(200).json({ message: "Received" });
  // res.body{messaage:"Received"};
});
app.get("/:id", (req, res) => {
  console.log(req.params.id);
});

app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
