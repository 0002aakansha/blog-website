const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.KEY)
        req.user = decode
        next()
    } catch (error) {
        res.status(404).json({ success: false, msg: error })
    }
}

module.exports = { requireSignIn }