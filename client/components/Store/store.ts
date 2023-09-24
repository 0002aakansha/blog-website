import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import blogsReducer from "./blogsReducer";
import { createWrapper } from "next-redux-wrapper";

const store = () => {
    return configureStore({
        reducer: {
            user: userReducer,
            blogs: blogsReducer
        },
        devTools: true
    })
}

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;

export type AppDispatch = ReturnType<AppStore["dispatch"]>
export const wrapper = createWrapper<AppStore>(store)
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;