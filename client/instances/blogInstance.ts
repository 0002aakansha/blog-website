import axios from 'axios'

const blogInstance = axios.create({
    baseURL: 'http://localhost:5000/blogs'
})

export default blogInstance