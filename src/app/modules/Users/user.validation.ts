import { z } from "zod";

// User creation validation schema
export const UserValidationSchema = z.object({
  name      : z.string({ invalid_type_error: "Name must be a string" }),
  email     : z.string({ invalid_type_error: "Email must be a string" }).email({ message: "Invalid email" }),
  password  : z.string({ invalid_type_error: "Password must be a string" }),
  role      : z.enum(["admin", "user"]).optional(),
  isBlocked : z.boolean({ invalid_type_error: "Blocked status must be a boolean" }).optional(),
}); // prettier-ignore
