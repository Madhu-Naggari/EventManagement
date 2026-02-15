const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "organizer"],
      default: "user",
    },
    contact: { type: String, trim: true, default: "" },
    description: { type: String, maxlength: 1000, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    profileImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
