const User = require("../Models/UserModel");
const { setUser } = require("../services/auth");
const bcrypt = require("bcryptjs");

// Function to get all users (not required in this project)
const handlegetalluser = async (req, res) => {
  const alluser = await User.find({});
  res.json(alluser);
};



const handleCreateNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ msg: "User created successfully", id: user._id });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};


// const handleCreateNewUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   // Validate request body
//   if (!name || !email || !password) {
//     res.status(400).json({ msg: "Data not sent by user" });
//     return;
//   }

//   try {
//     // Check if email already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       // If email exists, return an error message
//       return res
//         .status(400)
//         .json({ msg: "Email already exists. Please log in with other Email." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // If email is new, create a new user
//     const result = await User.create({
//       name: name,
//       email: email,
//       password: hashedPassword,
//     });
//     // Return success message with user ID
//     return res
//       .status(201)
//       .json({ msg: "User created successfully", id: result._id });
//   } catch (error) {
//     // console.error(error);
//     res
//       .status(500)
//       .json({ msg: "Internal server error", error: error.message });
//   }
// };

//login user
const handleLogInUser = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    console.log("invalid user");
    return res.status(401).json("invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json("Invalid email or password");
  }
  const token = setUser(user); //generate Token
  // console.log(token);
  return res.status(201).cookie("token", token).json({ token });
};

module.exports = {
  handlegetalluser,
  handleCreateNewUser,
  handleLogInUser,
};
