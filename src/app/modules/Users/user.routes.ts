import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controllers";
import { UserLoginValidationSchema, UserValidationSchema } from "./user.validation";

const router = Router();

// Register User / Create User
router.post("/auth/register", validateRequest(UserValidationSchema), UserController.register);

// Login User
router.post("/auth/login", validateRequest(UserLoginValidationSchema), UserController.login);

export const UserRoutes = router;
