import express from "express";
import { AuthService } from "./service";
import { cookieMiddleware } from "./middlewares";

export const AuthRouter = express.Router();

AuthRouter.post("/login", AuthService.login);

AuthRouter.get("/logout", (req, res) => {
	res.clearCookie("plato");
	return res.sendStatus(200);
});

AuthRouter.get("/check", cookieMiddleware, (req, res) => {
	(req as any)?.user ? res.sendStatus(200) : res.sendStatus(500);
});
