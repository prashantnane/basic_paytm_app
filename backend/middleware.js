const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config');

const authMiddleware = (req, res, next) => {
    authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "Error in the Bearer condition"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        req.userId = decode.userId;

        next();
        
    } catch (error) {
        return res.status(403).json({
            msg: "Error in the try catch"
        });
    }
}

module.exports = {
    authMiddleware
}