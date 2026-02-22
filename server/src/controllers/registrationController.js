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
      throw new Error("Invalid event ID");
    }

    // Check if event exists first (no increment yet)
    const eventExists = await Event.findById(eventId).session(session);
    if (!eventExists) {
      throw new Error("Event not found");
    }

    // Organizer cannot register
    if (eventExists.createdBy.toString() === userId.toString()) {
      throw new Error("Organizer cannot register for their own event");
    }

    // Check if already registered
    const existing = await Registration.findOne({ userId, eventId }).session(
      session,
    );

    if (existing && existing.status === "active") {
      throw new Error("Already registered");
    }

    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        $expr: { $lt: ["$registeredCount", "$capacity"] },
      },
      {
        $inc: { registeredCount: 1 },
      },
      { new: true, session },
    );

    if (!updatedEvent) {
      throw new Error("Event is full");
    }

    // Create or reactivate registration
    if (existing) {
      existing.status = "active";
      await existing.save({ session });
    } else {
      await Registration.create([{ userId, eventId, status: "active" }], {
        session,
      });
    }

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
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
