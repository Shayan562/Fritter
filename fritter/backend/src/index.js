// console.log("Test Run");
const express = require("express");
const { messageRouter } = require("./Routes/messageRoute");
const { postRouter } = require("./Routes/postRoute");
const { userRouter } = require("./Routes/userRoute");

const app = express();

app.use(express.json());
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
