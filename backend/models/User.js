const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters"],
        trim: true
      },
      lastname: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters"],
        trim: true
      }
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [6, "Email must be at least 6 characters"]
    },

    password: {
      type: String,
      required: true,
      select: false // Do not return password field by default
    },

    socketId: {
      type: String
    }
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
