const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      default: null,
    },
    city: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["donor", "patient", "admin"],
      default: "donor",
    },
    lastDonationDate: {
      type: Date,
      default: null,
    },
    availableToDonate: {
      type: Boolean,
      default: true,
    },
    medicalNotes: {
      type: String,
      default: "",
    },
    bloodRequirementFrequency: {
      type: String,
      enum: ["weekly", "bi-weekly", "monthly", "as-needed"],
      default: "as-needed",
    },
    guardianPhone: {
      type: String,
      default: "",
    },
  },
  {timestamps: true}
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
