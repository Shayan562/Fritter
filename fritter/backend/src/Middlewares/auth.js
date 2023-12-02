//verify request is made by logged in/authorized user
export const auth = (req, res, next) => {
  // try {
    //verification
    // console.log(req.headers.id);
    // req.Headers.id=req.params.id;
    next();
  // } catch {
    // console.log(error);
    // res.status(401).json({ message: "Some Error Occured" });
  // }
};

// module.exports = { auth };
