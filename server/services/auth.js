const jwt = require("jsonwebtoken");
const secretKay = "himanshuchandola98";
const User = require("../Models/UserModel");

const authMiddleware = async (req, res, next) => {
  console.log("auth calls");
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Get token from headers
    console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, secretKay); // Verify token
    // console.log(decoded);
    req.user = await User.findOne({ email: decoded.email }).select("email");
    // console.log("user:", req.user);
    if (!req.user) {
      return res.status(401).json({ msg: "User not found" });
    }
    console.log("Auth Done");
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

function setUser(user) {
  //generate a token
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKay
  );
}

module.exports = {
  setUser,

  authMiddleware,
};
