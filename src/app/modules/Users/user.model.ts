import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { UserInterface } from "./user.interface";

// User Model Schema
const UserSchema = new Schema<UserInterface>(
  {
    name      : { type: String, required: [true, "Name is required"], trim: true },
    email     : { type: String, required: [true, "Email is required"], trim: true, unique: true },
    password  : { type: String, required: [true, "Password is required"], select: 0 },
    role      : { type: String, enum: ["admin", "user"], default: "user" },
    isBlocked : { type: Boolean, default: false },
  },
  { timestamps: true },
); // prettier-ignore

// Hashing Password before saving to model
UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
});

export const UserModel = model<UserInterface>("User", UserSchema);
