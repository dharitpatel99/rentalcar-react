import { configureStore } from "@reduxjs/toolkit";
import usersReducer from"@/redux/userSlice"

const store = configureStore({
    reducer:{
        users:usersReducer,
    }
})

export default store;