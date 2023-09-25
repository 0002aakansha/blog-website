const { userRegister, userLogin, getAuthorName, getBlogsOfUser } = require('../controllers/users')
const {requireSignIn} = require('../middlewares/authMiddleware')

const express = require('express')
const userRouter = express.Router()

userRouter.post('/login', userLogin)
userRouter.get('/author-name', requireSignIn, getAuthorName)
userRouter.get('/user-blogs', requireSignIn, getBlogsOfUser)
userRouter.post('/register', userRegister)

module.exports = userRouter