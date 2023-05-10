const cookieMiddleware = (encodedCookie) => {
    return (req, res, next) => {
        // decoding stuff
        res.locals.cookie = "decodedCookie";
        next();
    }
}

export default cookieMiddleware;