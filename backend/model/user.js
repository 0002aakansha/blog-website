const mongoose = require('mongoose')

const schema = mongoose.Schema({
    profile: {
        type: {
            data: Buffer,
            contentType: String
        },
        trim: true
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

const users = mongoose.model('user', schema)

module.exports = users