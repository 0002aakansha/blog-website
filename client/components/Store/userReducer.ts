import userInstance from "@/instances/userInstance"
import { userReducerType } from "@/types/types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState: userReducerType = {
    user: {
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
        if (data.success) return data
        else throw data.msg
    } catch (error) {
        return rejectWithValue(error)
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
        if (data.success) return data
        else throw data.msg
    } catch (error) {
        return rejectWithValue(error)
    }
})

const users = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.isActive = false
            state.error = ''
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.error = ''
            state.loading = false
            state.isActive = true

            console.log(action.payload);
            

            localStorage.setItem('token', action.payload?.token)
            state.user = {
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

        builder.addCase(register.fulfilled, (state, action) => {
            state.error = ''
            state.loading = false
            state.isActive = true

            localStorage.setItem('token', action.payload?.token)
            state.user = {
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
    }
})

export default users.reducer