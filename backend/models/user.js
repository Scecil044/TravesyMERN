import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please fill out your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please fill out your last name"],
  },
  email: {
    type: String,
    required: [true, "Please fill out your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please fill out your password"],
  },
});

//function to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

export const User = mongoose.model("User", userSchema);
