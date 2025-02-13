const Event = require("../Models/EventModel");

const handlegetAllEvents = async (req, res) => {
  //the guest user can also see the Event List.
  try {
    console.log("All events API call");
    const allEvents = await Event.find({});
    return res.status(200).json({ allEvents });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  handlegetAllEvents,
};
