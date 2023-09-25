const Blogs = require("../model/blogs")
const path = require('path')
const fs = require('fs')
const getUserByToken = require("../helpers/getUserByToken")
const users = require("../model/user")

const createBlog = async (req, res) => {
    try {
        const { title, body } = req.body

        // getting user
        const currentUser = await getUserByToken(req.user._id)
        console.log(currentUser);

        const image = {
            data: fs.readFileSync(path.join(process.cwd(), '/images/' + req.file.filename)),
            contentType: 'image/png'
        }
        const newBlog = await new Blogs({
            image, title, body, isFeatured: false, author: currentUser.name
        })
        const result = await newBlog.save()
        console.log(result._id);

        // const user = await users.findByIdAndUpdate(
        //     currentUser._id,
        // { $push: { blogs: result._id } }, { safe: true, upsert: true, new: true }
        // )

        currentUser.blogs.push(newBlog);
        await currentUser.save();
        

        res.status(201).json({ success: true, msg: 'blog created and added to user document successfully', blog: result })

    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const getBlogs = async (req, res) => {
    try {
        const blog = await Blogs.find({})
        blog ? res.status(200).json({ success: true, blog }) : res.status(404).json({ success: false, msg: "error while fetching blogs!" })
    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const getBlogById = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blogs.findById({ _id: id })

        blog ? res.status(200).json({ success: true, blog }) : res.status(404).json({ success: false, msg: "Not Found!" })
    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const deleteBlogs = async (req, res) => {
    try {
        await Blogs.deleteMany({})
        res.status(200).send({ success: true, msg: "deleted successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, msg: error })
    }
}


module.exports = { createBlog, getBlogs, deleteBlogs, getBlogById }