const express = require("express");
const router = express.Router();

const {
  handleCreateNewUser,
  handleLogInUser,
} = require("../Controller/UserController");

router.route("/createNewUser").post(handleCreateNewUser); //signup
router.route("/loginUser").post(handleLogInUser); //login

module.exports = router;
