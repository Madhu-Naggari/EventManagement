const Event = require("../models/Event");
const Registration = require("../models/Registration");
const mongoose = require("mongoose");

// @desc Get all events with filtering
// @route GET /api/events
exports.getEvents = async (req, res, next) => {
  try {
    const { search, location, category } = req.query;

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (location) {
      query.location = { $regex: `^${location}$`, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const events = await Event.find(query).sort({ date: 1 });

    res.json({
      total: events.length,
      events,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get single event
// @route GET /api/events/:id
exports.getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Event not found" });
    }

    const event = await Event.findById(id).populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Event not found" });
    }
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(event, req.body);

    const updated = await event.save();

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Event not found" });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "No Access to delete" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted" });
  } catch (error) {
    next(error);
  }
};

exports.registerEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Event not found" });
    }
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.registeredCount >= event.capacity)
      return res.status(400).json({ message: "Event full" });

    await Registration.create({
      userId: req.user._id,
      eventId: event._id,
    });

    event.registeredCount += 1;
    await event.save();

    res.json({ message: "Registered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    next(error);
  }
};
