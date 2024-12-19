import { model, Schema } from "mongoose";
import { UserInterface } from "./user.interface";

// User Model Schema
const UserSchema = new Schema<UserInterface>(
  {
    name      : { type: String, required: [true, "Name is required"], trim: true },
    email     : { type: String, required: [true, "Email is required"], trim: true },
    password  : { type: String, required: [true, "Password is required"] },
    role      : { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked : { type: Boolean, default: false },
  },
  { timestamps: true },
); // prettier-ignore

export const User = model<UserInterface>("User", UserSchema);