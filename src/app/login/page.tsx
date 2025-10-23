"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

export default function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUser(user));
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="p-6 rounded-lg shadow-lg bg-white w-80">
                <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>
                <input
                    type="email"
                    className="border p-2 mb-2 w-full"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="border p-2 mb-4 w-full"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full">
                    Entrar
                </button>
            </form>
        </main>
    );
}
