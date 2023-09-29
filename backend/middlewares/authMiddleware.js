const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, process.env.KEY, (err, decodededToken) => {
                if (err) {
                    res.redirect('/login')
                    throw ('jwt expires')
                }
                else {
                    req.user = decodededToken
                    next()
                }
            })
        }
        else throw ('token not provided!')
    } catch (error) {
        res.status(404).json({ success: false, msg: error })
    }
}

module.exports = { requireSignIn }