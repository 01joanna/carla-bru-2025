import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Admin } from "@/types/Admin";

const initialState: Admin = {
    uid: null,
    email: null,
    role: null,
    isAdmin: false,
};

const authSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin(state, action: PayloadAction<Admin>) {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isAdmin = action.payload.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        },
        clearAdmin(state) {
            state.uid = null;
            state.email = null;
            state.role = null;
            state.isAdmin = false;
        },
    },
});

export const { setAdmin, clearAdmin } = authSlice.actions;
export default authSlice.reducer;
