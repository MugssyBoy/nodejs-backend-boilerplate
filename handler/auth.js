const jwt = require('jsonwebtoken');
const { comparePassword } = require('pcypher');
const {
    createUser,
    findUserByEmail
} = require('../config/dbQuery');

module.exports = {
    signin: async function (req, res, next) {
        try {
            let user = await findUserByEmail(req.body);
            let { id, username, password } = user;
            let isMatch = await comparePassword(req.body.password, password);
            if (isMatch) {
                let token = jwt.sign({ id, username, profileImageUrl}, process.env.SECRET_KEY);
                return res.status(200).json({ id, username, profileImageUrl, token});
            } else {
                return next({ status: 400, message: "Invalid Email/Password" });
            }
        } catch (err) {
            next(err);
        }
    },
    signup: async function(req, res, next) {
        try {
            let user = await createUser(req.body);
            let { id, username, profileImageUrl } = user;
            let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);
            return res.status(200).json({id, username, profileImageUrl, token})
        } catch (err) {
            next({ status: 400, message: err.message });
        }
    }
};