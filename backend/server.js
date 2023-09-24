const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

require('dotenv').config()

// database connect
require('./db/connect')

// user routes
const userRouter = require('./routes/users')
app.use('/user', userRouter)

// blog routes
const blogRouter = require('./routes/blogs')
app.use('/blogs', blogRouter)

app.listen(process.env.PORT, () => console.log(`server is listening on port ${process.env.PORT}`))