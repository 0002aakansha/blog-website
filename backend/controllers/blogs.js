const blogs = require("../model/blogs")
const users = require("../model/user")
const path = require('path')
const fs = require('fs')

const createBlog = async (req, res) => {
    try {
        const { title, body } = req.body
        console.log(path.join(process.cwd(), '/images/' + req.file.filename));
        const image = {
            data: fs.readFileSync(path.join(process.cwd(), '/images/' + req.file.filename)),
            contentType: 'image/png'
        }
        const newBlog = await new blogs({
            image, title, body, isFeatured: true
        })
        const result = await newBlog.save()

        if (result) {
            const user = await users.findByIdAndUpdate({ _id: req.user._id }, { $push: { blogs: result._id } }, { new: true })
            res.status(201).json({ success: true, msg: 'blog created and added to user document successfully', blog: user })
        }
        else res.status(400).json({ success: false, msg: error.message })

    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const getBlogs = async (req, res) => {
    try {
        const blog = await blogs.find({})
        blog ? res.status(200).json({ success: true, blog }) : res.status(404).json({ success: false, msg: "error while fetching blogs!" })
    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const getBlog = async (req, res) => {
    try {

    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const deleteBlogs = async (req, res) => {
    try {
        await blogs.deleteMany({})
        res.status(200).send({ success: true, msg: "deleted successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, msg: error })
    }
}


module.exports = { createBlog, getBlogs, getBlog, deleteBlogs }