import express from 'express';
import { login, signup } from '../Controllers/userController.js';
import { auth } from '../Middlewares/auth.js';
export const userRouter = express.Router();
userRouter.get("/",auth,(req,res)=>{
  res.send(req.headers.id);
})
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/detail", (req, res) => {
  res.send("details");
});
userRouter.put("/:id", (req,res)=>{
  
})
// userRouter.post("/detail", )
// module.exports = { userRouter };
