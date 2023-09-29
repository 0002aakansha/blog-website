const express = require('express')
const { createBlog, getBlogs, deleteBlogs, getBlogById, deleteBlog, updateBlog } = require('../controllers/blogs')
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

const upload = multer({ storage: multer.memoryStorage() })

blogRouter.post('/', requireSignIn, upload.single('image'), createBlog)
blogRouter.get('/', getBlogs)
blogRouter.get('/:id', getBlogById)
// blogRouter.delete('/', deleteBlogs)
blogRouter.patch('/:id', requireSignIn, upload.single('image'), updateBlog)
blogRouter.delete('/', requireSignIn, deleteBlog)

module.exports = blogRouter