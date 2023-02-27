import {model, Schema} from "mongoose";

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
      enum: ["Guest", "Admin"],
    }
  },
  {
    timestamps: true,
  }
);

export default model('User', userSchema);
