import { Router } from "express";
import validateToken from "../middlewares/validateToken.js";
import validateUrl from "../middlewares/validateUrl.js";
import tokenSchema from "../schemas/tokenSchema.js";
import urlSchema from "../schemas/urlSchema.js";
import { createLink, getLinkById, getLinkByShortUrl, deleteLinkById } from "../controllers/linksController.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken(tokenSchema), validateUrl(urlSchema), createLink);
urlsRouter.get("urls/:id", getLinkById);
urlsRouter.get("/urls/open/:shortUrl", getLinkByShortUrl);
urlsRouter.delete("/urls/:id", validateToken(tokenSchema), deleteLinkById);

export default urlsRouter;