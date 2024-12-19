import { model, Schema } from "mongoose";
import { BlogInterface } from "./blog.interface";

// Model Schema
const BlogSchema = new Schema<BlogInterface>(
  {
    title       : { type: String, required: [true, "Title is required"], trim: true },
    content     : { type: String, required: [true, "Content is required"] },
    author      : { type: Schema.Types.ObjectId, required: [true, "Author ID is required"], ref: "User" },
    isPublished : { type: Boolean, default: true },
  },
  { timestamps: true },
); // prettier-ignore

export const Blog = model<BlogInterface>("Blog", BlogSchema);
