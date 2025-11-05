import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
import { auth } from "./firebase";

export const subscribeToAuthChanges = (callback?: (user: any, isAdmin: boolean) => void) => {
    return onAuthStateChanged(auth, (user) => {
        const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        if (typeof callback === "function") callback(user, isAdmin);
    });
};

export async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
    return await signOut(auth);
}

export { auth };
