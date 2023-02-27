const mongoose = require("mongoose");
const constants = require("../constants/constants");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Guest", "Admin "],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
