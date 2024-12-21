import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogController } from "./blog.controllers";
import { BlogUpdateValidationSchema, BlogValidationSchema } from "./blog.validation";

const router = Router();

// Create Blog
router.post("/blogs", auth(), validateRequest(BlogValidationSchema), BlogController.createOne);

// Create Blog
router.patch("/blogs/:blogId", auth(), validateRequest(BlogUpdateValidationSchema), BlogController.updateOne);

// Delete Blog
router.delete("/blogs/:blogId", auth(), BlogController.deleteOne);

export const BlogRoutes = router;
