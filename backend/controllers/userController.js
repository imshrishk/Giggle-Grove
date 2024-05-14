const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createJWT = require("../utils/createJWT");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = [];

    if (!name) errors.push({ name: "Required" });
    if (!email) {
        errors.push({ email: "Required" });
    } else if (!emailRegexp.test(email)) {
        errors.push({ email: "Invalid" });
    }
    if (!password) errors.push({ password: "Required" });

    if (errors.length > 0) {
        return res.status(422).json({
            errors,
            message: 'Multiple errors while signing up, please retry.',
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(422).json({
                errors: [{ user: "Email Already Exists" }],
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            errors: [{ error: err.message }],
            message: 'Error saving a new user during signup.',
        });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) errors.push({ email: "Required" });
    else if (!emailRegexp.test(email)) errors.push({ email: "Invalid Email" });
    if (!password) errors.push({ password: "Required" });

    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                errors: [{ user: "Not Found" }],
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [{ password: "Incorrect" }],
            });
        }

        const accessToken = createJWT(user.email, user._id, 3000);

        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    errors: [{ error: err.message }],
                });
            }

            return res.status(200).json({
                success: true,
                token: accessToken,
                message: user,
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            errors: [{ error: err.message }],
            message: 'Error finding the user during sign-in',
        });
    }
};