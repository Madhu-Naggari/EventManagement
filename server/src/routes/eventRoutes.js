const express = require("express");
const router = express.Router();

const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
  getMyEvents,
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");

// Public routes
router.get("/", getEvents);
router.get("/my-events", protect, getMyEvents);
router.get("/:id", getEventById);

// Protected routes
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
