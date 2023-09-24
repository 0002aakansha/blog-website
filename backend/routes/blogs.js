const express = require('express')
const { createBlog, getBlogs, deleteBlogs } = require('../controllers/blogs')
const { requireSignIn } = require('../middlewares/authMiddleware')
const blogRouter = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage })

blogRouter.post('/', requireSignIn, upload.single('image'), createBlog)
blogRouter.get('/', getBlogs)
blogRouter.delete('/', deleteBlogs)

module.exports = blogRouter