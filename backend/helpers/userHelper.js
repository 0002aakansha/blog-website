const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function hashpassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    }
    catch (err) {
        console.log(err);
    }
}

async function comparePassword(password, hashedPassword) {
    try {
        const isMatched = await bcrypt.compare(password, hashedPassword)
        return isMatched
    }
    catch (err) {
        console.log(err);
    }
}

async function createToken(id) {
    console.log(id);
    const token = await jwt.sign({ _id: id }, process.env.KEY, {
        expiresIn: '7d'
    })
    return token
}

module.exports = { hashpassword, comparePassword, createToken }