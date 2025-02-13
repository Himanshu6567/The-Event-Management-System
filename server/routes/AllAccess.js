const express = require("express");
const router = express.Router();

const { handlegetAllEvents } = require("../Controller/AllAccess");

router.route("/allEvents").get(handlegetAllEvents);

module.exports = router;
