import blogInstance from "@/instances/blogInstance"
import { blogReducerType } from "@/types/types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState: blogReducerType = {
    blogs: [],
    loading: false,
    created: false,
    error: ''
}

export const fetchAllBlogs = createAsyncThunk('blogs/fetch', async (_, { rejectWithValue }) => {
    try {
        const { data } = await blogInstance({
            url: '/',
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })

        if (data.success) return data.blog
        else throw data.msg
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createBlog = createAsyncThunk('blogs/create', async (blogData, { rejectWithValue }) => {
    try {
        const { data } = await blogInstance({
            url: '/',
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            data: blogData
        })
        if (data.success) return data.blog
        else throw (data.msg)
    } catch (error) {
        return rejectWithValue(error)
    }
})

const blogs = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllBlogs.pending, (state, action) => {
            state.loading = true
            state.error = ''
            state.blogs = []
        })
        builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.blogs = action.payload
        })
        builder.addCase(fetchAllBlogs.rejected, (state, action) => {
            state.loading = false
            state.blogs = []
            state.error = action.payload
        })
        // create blog
        builder.addCase(createBlog.pending, (state, action) => {
            state.loading = true
            state.error = ''
            state.created = false
            state.blogs = []
        })
        builder.addCase(createBlog.fulfilled, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.created = true
            console.log(action.payload);

            console.log(state.blogs);
            state.blogs = [...state.blogs, action.payload]

        })
        builder.addCase(createBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.created = false
            state.blogs = []
        })
    }
})

export default blogs.reducer