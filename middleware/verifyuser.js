const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Authentication token is required" });
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err) return res.status(403).json({ message: "Token not valid" });
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(403).json({ message: "Error verifying token" });
    }
}

module.exports = verifyUser;