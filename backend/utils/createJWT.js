const jwt = require("jsonwebtoken");

const createJWT = (email, userId, duration) => {
    const payload = {
        email,
        userId,
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: `${duration}s`, // Specify the duration in seconds
    });
};

module.exports = createJWT;