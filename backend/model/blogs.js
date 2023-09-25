const mongoose = require('mongoose')

const schema = mongoose.Schema({
    image: {
        type: {
            data: Buffer,
            contentType: String
        },
        trim: true,
        // required: true
    },
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    isFeatured: Boolean,
    author: String
}, {
    timestamps: true
})
const Blogs = mongoose.model('Blog', schema)

module.exports = Blogs