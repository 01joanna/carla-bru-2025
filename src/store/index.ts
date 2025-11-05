import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import adminReducer from "@/store/slices/authSlice";
import projectsReducer from "./slices/projectsSlice";
import { auth } from "@/lib/firebase";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        projects: projectsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
