const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  club: { type: String, required: true },
  description: String,

  date: { type: String, required: true },

  time: { type: String, required: true },

  venue: { type: String, required: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // REQUIRED for registration to work
  registeredStudents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ]
});

module.exports = mongoose.model("Event", EventSchema);


