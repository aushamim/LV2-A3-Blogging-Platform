import { Types } from "mongoose";

// Blog core interface
export interface BlogInterface {
  title        : string;
  content      : string;
  author       : Types.ObjectId;
  isPublished? : boolean;
} // prettier-ignore

export interface BlogUpdateInterface {
  title?   : string;
  content? : string;
} // prettier-ignore

export interface BlogQueryParamsInterface {
  search?    : string;
  sortBy?    : string;
  sortOrder? : "asc" | "desc";
  filter?    : string;
} // prettier-ignore
