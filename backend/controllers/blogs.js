const Blogs = require("../model/blogs")
const getUserByToken = require("../helpers/getUserByToken")
const users = require("../model/user")

const createBlog = async (req, res) => {
    try {
        const { title, body } = req.body

        // getting user
        const currentUser = await getUserByToken(req.user._id)
        console.log(currentUser.null);

        // const image = {
        //     data: fs.readFileSync(path.join(process.cwd(), '/images/' + req.file.filename)),
        //     contentType: 'image/png'
        // }
        const image = {
            data: req.file.buffer,
            contentType: 'image/png'
        }

        const newBlog = await new Blogs({
            image, title, body, isFeatured: false, author: currentUser.name
        })
        const result = await newBlog.save()

        // const user = await users.findByIdAndUpdate(
        //     currentUser._id,
        // { $push: { blogs: result._id } }, { upsert: true, new: true }
        // )

        currentUser.blogs.push(result._id);
        await currentUser.save();

        res.status(201).json({ success: true, msg: 'blog created!', blog: result, currentUser })

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

const deleteBlog = async (req, res) => {
    try {
        const { _id } = req.body
        await Blogs.findByIdAndDelete({ _id })
        await users.findByIdAndUpdate({ _id }, {})
        res.status(200).send({ success: true, msg: "deleted successfully!" })
    } catch (error) {
        res.status(404).json({ success: false, msg: error })
    }
}

module.exports = { createBlog, getBlogs, deleteBlogs, getBlogById, deleteBlog }