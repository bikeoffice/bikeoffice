import express from 'express';
import { validateUser } from '../services/authService';
import cookieMiddleware from '../middlewares/auth';

export const AuthRouter = express.Router();

AuthRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await validateUser(username, password);
    if (user) {
        res.cookie("plato", user, {
            maxAge: 900000,
            httpOnly: true,
            sameSite: 'strict', // Set sameSite to 'strict' to prevent CSRF attacks
            secure: true // Set secure to true when using HTTPS
        }) &&
            res.send({ message: 'Plato set' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

AuthRouter.use(cookieMiddleware);
AuthRouter.get('/check', (req, res) => {
    (req as any)?.user ? res.sendStatus(200) : res.sendStatus(500)
})

