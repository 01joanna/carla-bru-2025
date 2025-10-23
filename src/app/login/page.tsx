"use client"
import { useAppDispatch } from "@/hooks/useDispatch"
import React, { useState } from "react"
import { login } from "@/lib/auth"
import { setAdmin } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"

export default function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const router = useRouter();

    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null)
        
        try {
            const credentials = await login(email, password);
            const user = credentials.user;
            dispatch(setAdmin({
                uid: user.uid,
                email: user.email,
                role: "admin"
            }))
            console.log("Login successful:", user);
            router.replace("/")
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred")
        }
    }

    return (
        <section className="w-screen h-screen flex flex-col gap-10 items-center justify-center">
        {/* <p className="uppercase w-[700px] text-justify">Solo yo puedo entrar y configurar la base de datos de las Fuentes. No creo que sea de interés para nadie, pero este es el login para acceder a todos los permisos. Si quieres acceder, ¡buena suerte!</p> */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 py-20 px-20 border border-white rounded-md">
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="px-10 py-2 border border-white bg-black" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="px-10 py-2 border border-white" />

                </div>
            </div>
            <button type="submit" className="p-3 bg-gray-400 rounded-md cursor-pointer">Login</button>
        </form>
        <p>
            {error && <span className="text-red-500">{error}</span>}
        </p>
    </section>
    )
    }
