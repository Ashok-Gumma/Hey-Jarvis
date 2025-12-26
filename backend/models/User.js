import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hobbies: [String],
    strengths: [String],
    weaknesses: [String],
  },
  { timestamps: true }
);

export default model("User", userSchema);
