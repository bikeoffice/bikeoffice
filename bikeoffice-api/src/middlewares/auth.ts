const cookieMiddleware = (req, res, next) => {
    const { schema } = req.cookies;
    if (!schema) {
        return res.status(401).send('Unauthorized');
    }
    // Do any additional authentication and authorization checks here
    req.schema = schema;
    next();
}

export default cookieMiddleware;