import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "../../types/Admin";

const initialState: Admin = {
    uid: null,
    email: null,
    role: null
};

const authSlice = createSlice({
    name: "auth", initialState,
    reducers: {
        setAdmin(state, action: PayloadAction<Admin>) {
            return { ...state, ...action.payload };
        },
        clearAdmin(state) {
            state.uid = null;
            state.email = null;
            state.role = null;
        }
    },
});

export const { setAdmin, clearAdmin } = authSlice.actions;
export default authSlice.reducer;
