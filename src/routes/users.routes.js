import { Router } from "express";
import validateUser from "../middlewares/validateUser.js";
import validateLogin from "../middlewares/validateLogin.js";
import { userSchema, loginSchema } from "../schemas/userSchema.js";
import { createUser, login } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post("/signup", validateUser(userSchema), createUser);
usersRouter.post("/signin", validateLogin(loginSchema), login);

export default usersRouter;