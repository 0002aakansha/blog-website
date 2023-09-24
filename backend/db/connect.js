const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.CONNECT)
    .then(() => console.log('connected to database successfully!'))
    .catch(err => console.log(err))
    