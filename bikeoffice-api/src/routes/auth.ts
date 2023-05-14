import express from 'express';

var AuthRouter = express.Router();

AuthRouter.post('/login', (req, res) => {
    console.log('el body: ', req.body);
    res.send('logged in successfully');
});

export default AuthRouter;

