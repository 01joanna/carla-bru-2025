
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { subscribeToAuthChanges } from "@/lib/auth";
import { setAdmin, clearAdmin } from "@/store/slices/authSlice";

export default function useAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((user, isAdmin) => {
            if (user && isAdmin) {
                dispatch(setAdmin({ uid: user.uid, email: user.email, role: "admin" }));
            } else {
                dispatch(clearAdmin());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);
}
