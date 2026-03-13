require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
connectDB();

// REGISTER + LOGIN routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));


// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



