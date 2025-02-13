const Event = require("../Models/EventModel");
const multer = require("multer");
const { getSocketIO } = require("../socket");

const cloudinary = require("../cloudinary-config");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const handleCreateNewEvent = async (req, res) => {
  // create new Event
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized. Please log in." });
    }
    if (!req.file) {
      return res.status(400).json({ msg: "Image is required" });
    }
    const { eventName, location, description, date, time, category } = req.body;

    const imagePath = req.file.path;
    const cloudinaryResult = await cloudinary.uploader.upload(imagePath, {
      folder: "event_images", // Optional: specify a folder to store images in Cloudinary
    });

    const { secure_url } = cloudinaryResult;

    if (
      !eventName ||
      !location ||
      !description ||
      !date ||
      !time ||
      !category
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const result = await Event.create({
      eventName,
      location,
      description,
      date,
      time,
      category,
      image: secure_url,
      organizer: req.user._id,
    });

    return res
      .status(201)
      .json({ msg: "Event created successfully", id: result._id });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const MyCreatedEvents = async (req, res) => {
  //get all events which creted by user
  const userId = req.user._id.toHexString();
  //   console.log(userId);
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized. Please log in." });
    }
    const myEvents = await Event.find({ organizer: userId });
    return res.status(200).json({ events: myEvents });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// return the Event Details
const handleGetEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    // Find event by ID
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// const HandleUpdateEventDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, date, time, location, category } = req.body;

//     const event = await Event.findById(id);
//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }
//     event.eventName = name;
//     event.description = description;
//     event.date = date;
//     event.time = time;
//     event.location = location;
//     event.category = category;
//     event.updatedAt = new Date();

//     await event.save();

//     return res.status(200).json({ msg: "Event update successful", event });
//   } catch (error) {
//     console.error("Backend Error:", error.message);
//     res
//       .status(500)
//       .json({ msg: "Internal Server Error", error: error.message });
//   }
// };

// const HandleDeleteEvent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const event = await Event.findByIdAndDelete(id);
//     if (!event) {
//       return res.status(404).json({ msg: "Event not found" });
//     }

//     res.status(200).json({ msg: "Event deleted successfully", event });
//   } catch (error) {
//     // console.error("Error updating event details:", error.message);
//     res
//       .status(500)
//       .json({ msg: "Internal Server Error", error: error.message });
//   }
// };

const HandleJoinEvent = async (req, res) => {
  //user join any event
  try {
    const { id } = req.params;
    const userId = req.user._id.toHexString();

    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User already joined this event" });
    }

    event.attendees.push(userId);
    event.attendeesCount = event.attendees.length;

    await event.save();
    const io = getSocketIO();
    io.emit("joinEvent", { id, attendeeCount: event.attendees.length });
    return res
      .status(200)
      .json({ message: "Joined event successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const myAttendedEvents = async (req, res) => {
  //return my all attended Events
  try {
    const userId = req.user._id.toHexString();
    const myAttendEvn = await Event.find({ attendees: userId });
    return res.status(200).json({ events: myAttendEvn });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleCreateNewEvent: [upload.single("image"), handleCreateNewEvent],
  MyCreatedEvents,
  handleGetEventDetails,
  // HandleUpdateEventDetails,
  // HandleDeleteEvent,
  HandleJoinEvent,
  myAttendedEvents,
};
