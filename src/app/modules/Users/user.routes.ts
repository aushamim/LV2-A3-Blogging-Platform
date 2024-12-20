import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controllers";
import { UserValidationSchema } from "./user.validation";

const router = Router();

router.post("/auth/register", validateRequest(UserValidationSchema), UserController.register);

export const UserRoutes = router;
