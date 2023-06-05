import { Response } from "express";
import { decrypt } from "./service";

export const cookieMiddleware = (req: any, res: Response, next: any) => {
    try {
        req.user = decrypt(req.cookies.plato);
    } catch (error) {
        return res.sendStatus(401);
    }
    next();
}
