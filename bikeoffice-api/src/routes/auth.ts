import express from 'express';
import { decrypt, validateUser } from '../services/authService';

var AuthRouter = express.Router();

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

AuthRouter.get('/check', (req, res) => {
    try {
        const decryptedText = decrypt(req.cookies.plato);
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(401);
    }
})

export default AuthRouter;

