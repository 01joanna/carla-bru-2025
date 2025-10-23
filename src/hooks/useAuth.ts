import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { setAdmin, clearAdmin } from "@/store/slices/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                dispatch(
                    setAdmin({
                        uid: user.uid,
                        email: user.email,
                        role: "admin", 
                    })
                );
            } else {
                dispatch(clearAdmin());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);
};