import { Types } from "mongoose";

// Blog core interface
export interface BlogInterface {
  title        : string;
  content      : string;
  author       : Types.ObjectId;
  isPublished? : boolean;
} // prettier-ignore
