const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  registerEvent,
  cancelRegistration,
  getUserRegistrations,
  checkRegistration,
} = require("../controllers/registrationController");

router.post("/:eventId", protect, registerEvent);
router.delete("/:eventId", protect, cancelRegistration);
router.get("/check/:eventId", protect, checkRegistration);
router.get("/my-events", protect, getUserRegistrations);

module.exports = router;
