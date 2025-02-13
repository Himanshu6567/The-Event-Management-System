const express = require("express");
const router = express.Router();

const {
  handleCreateNewEvent,
  MyCreatedEvents,
  handleGetEventDetails,
  // HandleUpdateEventDetails,
  // HandleDeleteEvent,
  HandleJoinEvent,
  myAttendedEvents,
} = require("../Controller/EventController");

router.route("/createNewEvent").post(handleCreateNewEvent);
router.route("/MyCreatedEvents").get(MyCreatedEvents);
router.route("/getDetails/:id").get(handleGetEventDetails);
// router.route("/updateEvent/:id").patch(HandleUpdateEventDetails);
// router.route("/deleteEvent/:id").delete(HandleDeleteEvent);
router.route("/join/:id").post(HandleJoinEvent);
router.route("/myAttendedEvents").get(myAttendedEvents);

module.exports = router;
