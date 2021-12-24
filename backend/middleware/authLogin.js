const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.access_token ||
        req.query.access_token ||
        req.headers["authorization"];
    console.log("TOKEN IS:", token);

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        console.log("config.TOKEN_SECRET", config.TOKEN_SECRET);
        const decoded = jwt.verify(token, config.TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
