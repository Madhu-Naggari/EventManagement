const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    status: { type: String, enum: ["active", "cancelled"], default: "active" },
  },
  { timestamps: true },
);

registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model("Registration", registrationSchema);
