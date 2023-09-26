const users = require("../model/user");

async function getUserByToken(_id) {
    return await users.findById({ _id })
}

module.exports = getUserByToken