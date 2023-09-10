import mongoose from "mongoose";

const goalsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: [true, "Please enter a valid text here"],
  },
});

export const Goal = mongoose.model("Goal", goalsSchema);
