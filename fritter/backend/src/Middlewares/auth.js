//verify request is made by logged in/authorized user
const auth = (req, res, next) => {
  try {
    //verification
    next();
  } catch {
    console.log(error);
    res.status(401).json({ message: "Some Error Occured" });
  }
};

module.exports = { auth };
