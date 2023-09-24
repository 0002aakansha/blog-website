const { userRegister, userLogin } = require('../controllers/users')

const express = require('express')
const userRouter = express.Router()

userRouter.post('/login', userLogin)
userRouter.post('/register', userRegister)

module.exports = userRouter