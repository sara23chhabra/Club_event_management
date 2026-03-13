const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// =========================================
// GET REGISTRATIONS FOR COORDINATOR
// =========================================
router.get("/registrations/:coordinatorId", async (req, res) => {
  try {
    const coordinatorId = req.params.coordinatorId;

    const events = await Event.find({ createdBy: coordinatorId });
    const eventIds = events.map(e => e._id);

    const registrations = await Registration.find({
      eventId: { $in: eventIds }
    })
      .populate("studentId", "name email")
      .populate("eventId", "title date venue");

    res.json(registrations);

  } catch (err) {
    console.error("Error loading registrations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================================
// GET ALL EVENTS
// =========================================
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json({ events });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// =========================================
// ADD EVENT — WITH DUPLICATE CHECK
// =========================================
router.post("/add", async (req, res) => {
  try {
    let { title, club, description, date, time, venue, createdBy } = req.body;

    // Required fields check
    if (!title || !club || !date || !time || !venue || !createdBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Normalize time + venue for consistent matching
    time = time.trim().toLowerCase();
    venue = venue.trim().toLowerCase();

    // Check if an event already exists with same date/time/venue
    const existing = await Event.findOne({
      date,
      time,
      venue
    });

    if (existing) {
      return res.status(400).json({
        message:
          "An event already exists at this date, time, and venue. Please choose a different slot."
      });
    }

    // Create event
    const event = new Event({
      title,
      club,
      description,
      date,
      time,
      venue,
      createdBy
    });

    await event.save();

    return res.json({ message: "Event added successfully", event });

  } catch (err) {
    console.error("Error adding event:", err);
    res.status(500).json({ message: "Server error while adding event" });
  }
});

// =========================================
// REGISTER FOR EVENT
// =========================================
router.post("/:eventId/register", async (req, res) => {
  try {
    const { userId } = req.body;
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Prevent duplicate registration
    if (event.registeredStudents.includes(userId)) {
      return res.status(400).json({ message: "Already registered" });
    }

    // Add student to event registration list
    event.registeredStudents.push(userId);
    await event.save();

    // Also store registration log
    await new Registration({
      studentId: userId,
      eventId: eventId
    }).save();

    res.json({ message: "Registered successfully" });

  } catch (err) {
    console.error("Error registering student:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;



