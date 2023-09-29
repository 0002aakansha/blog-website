import { getCookie } from "@/auth/cookies"
import blogInstance from "@/instances/blogInstance"
import { blogReducerType } from "@/types/types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState: blogReducerType = {
    blogs: [],
    loading: false,
    created: false,
    updated: false,
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

export const updateBlog = createAsyncThunk('blogs/update', async (
    { _id, formData }: { _id: string, formData: { title: string, body: string, image: File | null } },
    { rejectWithValue }
) => {
    try {
        const { data } = await blogInstance({
            url: `/${_id}`,
            method: 'PATCH',
            headers: {
                Authorization: getCookie()
            },
            data: formData
        })

        if (data.success) {
            return data.result
        }
        else throw (data.msg)

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
                Authorization: getCookie()
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
        })
        builder.addCase(fetchAllBlogs.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.blogs = action.payload
        })
        builder.addCase(fetchAllBlogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // create blog
        builder.addCase(createBlog.pending, (state, action) => {
            state.loading = true
            state.error = ''
            state.created = false
        })
        builder.addCase(createBlog.fulfilled, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.created = true
        })
        builder.addCase(createBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.created = false
        })
        // update blog
        builder.addCase(updateBlog.pending, (state, action) => {
            state.loading = true
            state.error = ''
            state.updated = false
        })
        builder.addCase(updateBlog.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.updated = true
        })
        builder.addCase(updateBlog.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.updated = false
        })
    }
})

export default blogs.reducer