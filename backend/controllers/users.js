const getUserByToken = require("../helpers/getUserByToken");
const { hashpassword, comparePassword, createToken } = require("../helpers/userHelper");
const users = require("../model/user")

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const User = await users.findOne({ email })
        if (!User) {
            res.status(404).json({ success: false, msg: 'Please Login First!' })
        }
        else {
            const isTrue = await comparePassword(password, User.password)
            if (isTrue) {
                const token = await createToken(User._id)
                res.status(200).json({ success: true, msg: 'Logged in successfully', user: User, token })
            }
            else res.status(200).json({ success: false, msg: 'Password is incorrect!' })
        }
    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const userRegister = async (req, res) => {
    try {
        const { profile, name, email, password } = req.body
        const isAlreadyExists = await users.findOne({ email })

        if (isAlreadyExists) {
            res.status(200).json({ success: false, msg: 'User Already Exists!' })
        }
        else {
            const hashedPassword = await hashpassword(password)
            const userCreate = await new users({ profile, name, email, password: hashedPassword })
            const newUser = await userCreate.save()
            const token = await createToken(newUser._id)
            res.status(201).send({ success: true, msg: 'User created successfully', user: newUser, token })
        }
    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const getAuthorName = async (req, res) => {
    try {
        const { name } = await getUserByToken(req.user._id)
        res.status(200).json({ success: true, user: { name } })
    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

const getBlogsOfUser = async (req, res) => {
    try {
        const user = await getUserByToken(req.user._id)
        console.log(user);
        const blogs = await users.aggregate(
            {
                $lookup: {
                    from: "blogs",
                    localField: "blogs",
                    foreignField: "_id",
                    as: "user_blogs",
                },
            })
        console.log(blogs);
        res.status(200).json({ success: true, user: { blogs } })

    } catch (error) {
        res.status(404).json({ success: false, msg: error.message })
    }
}

module.exports = { userLogin, userRegister, getAuthorName, getBlogsOfUser }