const jwt = require("jsonwebtoken")
require("dotenv").config;

const authUser = (req, res, next) =>  {
    try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}

module.exports = authUser;