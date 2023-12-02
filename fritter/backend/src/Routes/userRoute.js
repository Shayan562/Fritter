import express from 'express';
export const userRouter = express.Router();

userRouter.post("/signup", (req, res) => {
  res.send("signup");
});
userRouter.post("/login", (req, res) => {
  res.send("login");
});
userRouter.get("/detail", (req, res) => {
  res.send("details");
});
userRouter.put("/:id", (req,res)=>{
  
})
// userRouter.post("/detail", )
// module.exports = { userRouter };
