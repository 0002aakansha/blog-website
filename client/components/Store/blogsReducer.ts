import blogInstance from "@/instances/blogInstance"
import { BlogType } from "@/types/types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState: { blogs: BlogType[] } = {
    blogs: []
}

export const fetchAllBlogs = createAsyncThunk('blogs/fetch', async () => {
    const { data } = await blogInstance({
        url: '/',
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    })

    const blog = data.blog
    return blog
})

export const createBlog = createAsyncThunk('blogs/create', async (blogData) => {
    const { data } = await blogInstance({
        url: '/',
        method: 'POST',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        data: JSON.stringify(blogData)
    })
    console.log(data);

    return data
})

const blogs = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllBlogs.pending, (state, action) => {
            // console.log(action.payload);
            state.blogs = []
        })
        builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.blogs = action.payload
        })
        builder.addCase(createBlog.fulfilled, (state, action) => {
            console.log(action.payload);

            // state.blogs.push(action.payload)
        })
    }
})

export default blogs.reducer