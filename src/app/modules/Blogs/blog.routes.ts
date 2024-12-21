import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogController } from "./blog.controllers";
import { BlogUpdateValidationSchema, BlogValidationSchema } from "./blog.validation";

const router = Router();

// Get All Blog
router.get("/blogs", BlogController.getAll);

// Create Blog
router.post("/blogs", auth(), validateRequest(BlogValidationSchema), BlogController.createOne);

// Update Blog
router.patch("/blogs/:id", auth(), validateRequest(BlogUpdateValidationSchema), BlogController.updateOne);

// Delete Blog
router.delete("/blogs/:id", auth(), BlogController.deleteOne);

// Delete Blog (ADMIN)
router.delete("/admin/blogs/:id", auth(), BlogController.deleteOne);

export const BlogRoutes = router;
