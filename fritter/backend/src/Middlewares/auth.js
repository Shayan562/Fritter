import jwt from 'jsonwebtoken'

//verify request is made by logged in/authorized user
export const auth = (req, res, next) => {
    //verification
    // const token=req.headers.token;
    // 
    // console.log("Token: "+req.headers.token);
    // if(token){
      // const user = jwt.verify(token,"FRITTER");
    //   // req.headers.id=user.id;
    // }
    // else{
    //   res.send({message:"Unauthorized User"});
    //   return;
    // }
    next();
};

