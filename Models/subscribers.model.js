import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const Subscribe = mongoose.model("Subscribe", subscribersSchema);
export default Subscribe;
