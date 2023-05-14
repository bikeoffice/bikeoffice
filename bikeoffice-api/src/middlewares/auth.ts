const cookieMiddleware = (req, res, next) => {
    const { user } = req.cookies;
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    // Do any additional authentication and authorization checks here
    req.user = user;
    next();
}

export default cookieMiddleware;