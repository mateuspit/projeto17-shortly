import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateUrl from "../middlewares/validateUrl.js";
import tokenSchema from "../schemas/tokenSchema.js";
import urlSchema from "../schemas/urlSchema.js";
import { createLink } from "../controllers/linksController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken(tokenSchema), validateUrl(urlSchema), createLink);

export default urlsRouter;