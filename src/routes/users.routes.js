import { Router } from "express";
import validateUser from "../middlewares/validateUser.js";
import validateLogin from "../middlewares/validateLogin.js";
import validateToken from "../middlewares/validateToken.js";
import { userSchema, loginSchema } from "../schemas/userSchema.js";
import { createUser, login, getUserData, ranking } from "../controllers/usersController.js";
import { tokenSchema } from "../schemas/tokenSchema.js";

const usersRouter = Router();

usersRouter.post("/signup", validateUser(userSchema), createUser);
usersRouter.post("/signin", validateLogin(loginSchema), login);
usersRouter.get("/users/me", validateToken(tokenSchema), getUserData)
usersRouter.get("/ranking", ranking);

export default usersRouter;