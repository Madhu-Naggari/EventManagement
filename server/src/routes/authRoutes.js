const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const {
  registerUser,
  loginUser,
  googleLogin,
  updateProfile,
  getProfileDetails,
} = require("../controllers/authController");
const { contact } = require("../controllers/contact");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.post("/contact", protect, contact);
router.get("/get-profile", protect, getProfileDetails);
router.put("/profile", protect, upload.single("profileImage"), updateProfile);
module.exports = router;
