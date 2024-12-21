import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogController } from "./blog.controllers";
import { BlogUpdateValidationSchema, BlogValidationSchema } from "./blog.validation";

const router = Router();

// Create Blog
router.post("/blogs", auth(), validateRequest(BlogValidationSchema), BlogController.create);

// Create Blog
router.patch("/blogs/:blogId", auth(), validateRequest(BlogUpdateValidationSchema), BlogController.update);

export const BlogRoutes = router;
