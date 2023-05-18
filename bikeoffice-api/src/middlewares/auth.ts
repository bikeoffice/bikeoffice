import { Response } from "express";
import { decrypt } from "../services/authService";

const cookieMiddleware = (req, res: Response, next) => {
    try {
        req.user = decrypt(req.cookies.plato);
    } catch (error) {
        return res.sendStatus(401);
    }
    next();
}

export default cookieMiddleware;