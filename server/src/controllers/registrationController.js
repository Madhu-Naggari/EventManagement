const mongoose = require("mongoose");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// @desc Register for event
// @route POST /api/registrations/:eventId
exports.registerEvent = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await Event.findById(eventId).session(session);
    if (event.createdBy.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Organizer cannot register for their own event" });
    }
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existing = await Registration.findOne({ userId, eventId }).session(
      session,
    );

    // If already active → stop
    if (existing && existing.status === "active") {
      return res.status(400).json({ message: "Already registered" });
    }

    // Check capacity BEFORE activating/creating
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    if (existing) {
      // Reactivate cancelled registration
      existing.status = "active";
      await existing.save({ session });
    } else {
      // Create new registration
      await Registration.create([{ userId, eventId, status: "active" }], {
        session,
      });
    }

    // Increment count only once
    event.registeredCount += 1;
    await event.save({ session });

    await session.commitTransaction();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Cancel registration
// @route DELETE /api/registrations/:eventId
exports.cancelRegistration = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const registration = await Registration.findOne({
      userId,
      eventId,
      status: "active",
    });

    if (!registration) {
      res.status(400);
      throw new Error("No active registration found");
    }

    await Registration.updateOne(
      { _id: registration._id },
      { status: "cancelled" },
      { session },
    );

    await Event.findByIdAndUpdate(
      eventId,
      { $inc: { registeredCount: -1 } },
      { session },
    );

    await session.commitTransaction();

    res.json({ message: "Registration cancelled" });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc Get logged-in user's events
// @route GET /api/registrations/my-events
exports.getUserRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({
      userId: req.user._id,
      status: "active",
    }).populate("eventId");

    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

exports.checkRegistration = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const registration = await Registration.findOne({
      userId: req.user._id,
      eventId: eventId,
      status: { $ne: "cancelled" },
    });

    res.json({
      isRegistered: !!registration,
      registrationId: registration?._id || null,
    });
  } catch (error) {
    next(error);
  }
};
