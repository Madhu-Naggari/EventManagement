const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    organizer: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Technology",
        "Business",
        "Education",
        "Music",
        "Sports",
        "Health",
        "Other",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    registeredCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

eventSchema.index({
  name: "text",
  description: "text",
});

eventSchema.index({ category: 1, location: 1 });

eventSchema.virtual("availableSeats").get(function () {
  return this.capacity - this.registeredCount;
});

eventSchema.set("toJSON", { virtuals: true });
eventSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Event", eventSchema);
