import express from 'express';
import { validateUser } from '../services/authService';

var AuthRouter = express.Router();

AuthRouter.post('/login', async (req, res) => {
    await validateUser('', '');
    res.send('logged in successfully');
});

export default AuthRouter;

