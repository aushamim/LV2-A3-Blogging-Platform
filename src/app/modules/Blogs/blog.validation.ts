import { z } from "zod";

export const BlogValidationSchema = z.object({
  title       : z.string({ invalid_type_error: "Title must be a string" }),
  content     : z.string({ invalid_type_error: "Content must be a string" }),
  author      : z.string({ invalid_type_error: "Author ID must be a string" }).optional(),
  isPublished : z.boolean({ invalid_type_error: "isPublished must be a boolean" }).optional(),
}); // prettier-ignore

export const BlogUpdateValidationSchema = z.object({
  title   : z.string({ invalid_type_error: "Title must be a string" }).optional(),
  content : z.string({ invalid_type_error: "Content must be a string" }).optional(),
}); // prettier-ignore
