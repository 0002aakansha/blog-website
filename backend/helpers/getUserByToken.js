const users = require("../model/user");

async function getUserByToken(_id) {
    return await users.findByIdAndUpdate({ _id }, { $push: { blogs: _id } }, { new: true })
}

module.exports = getUserByToken