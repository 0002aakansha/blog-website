import { getCookie, setCookies } from "@/auth/cookies"
import userInstance from "@/instances/userInstance"
import { userReducerType } from "@/types/types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState: userReducerType = {
    user: {
        _id: '',
        name: '',
        email: '',
        blogs: []
    },
    loading: false,
    isActive: false,
    error: ''
}

export const login = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
    try {
        const { data } = await userInstance({
            url: '/login',
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            data: JSON.stringify(user)
        })
        if (data.success) {
            setCookies(data.token)
            return data
        }
        else throw data.msg
    } catch (error) {
        return rejectWithValue(error?.response?.data?.msg || error)
    }
})

export const register = createAsyncThunk('user/register', async (user, { rejectWithValue }) => {
    try {
        const { data } = await userInstance({
            url: '/register',
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            data: JSON.stringify(user)
        })
        if (data.success) {
            setCookies(data.token)
            return data
        }
        else throw data.msg
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const fetchUserBlogs = createAsyncThunk('user/user-blogs', async (_, { rejectWithValue }) => {
    try {
        const { data } = await userInstance({
            url: '/user-blogs',
            method: 'GET',
            headers: {
                Authorization: getCookie()
            }
        })

        if (data.success) {
            return data.user.blogs
        }
        else throw (data.msg)
    } catch (error) {
        return rejectWithValue(error)
    }
})

const users = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.isActive = false
            state.error = ''
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.error = ''
            state.loading = false
            state.isActive = true

            state.user = {
                _id: action.payload?.user?._id,
                name: action.payload?.user?.name,
                email: action.payload?.user?.email,
                blogs: action.payload?.user?.blogs
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isActive = false
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(register.pending, (state, action) => {
            state.loading = true
            state.isActive = false
            state.error = ''
        })
        // register
        builder.addCase(register.fulfilled, (state, action) => {
            state.error = ''
            state.loading = false
            state.isActive = true

            state.user = {
                _id: action.payload?.user?._id,
                name: action.payload?.user?.name,
                email: action.payload?.user?.email,
                blogs: action.payload?.user?.blogs
            }
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isActive = false
            state.loading = false
            state.error = action.payload
        })

        // fetch blogs
        builder.addCase(fetchUserBlogs.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchUserBlogs.fulfilled, (state, action) => {
            state.loading = false
            state.user.blogs = action.payload
            state.error = ''
        })
        builder.addCase(fetchUserBlogs.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default users.reducer