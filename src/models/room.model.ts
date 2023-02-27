import { model, Schema, Types } from "mongoose"

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
      type: Schema.Types.ObjectId,
      required: true,
      enum: ["Suites", "Presidential Suites", "Deluxe", "Twin Room"],
    },
  },
  {
    timestamps: true,
  }
);

export default model('Room', room_Schema)
