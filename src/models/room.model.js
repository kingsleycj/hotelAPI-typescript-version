const { model, Schema, Types } = require("mongoose");
const constants = require("../constants/constants");

const ObjectId = Types.ObjectId;

const room_Schema = new Schema(
  {
    codeName: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    roomType: {
      type: ObjectId,
      required: true,
      enum: ["Suites", "Presidential Suites", "Deluxe", "Twin Room"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(room_Schema)
