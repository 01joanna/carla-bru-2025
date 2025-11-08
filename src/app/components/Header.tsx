"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { clearAdmin } from "@/store/slices/authSlice";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const dispatch = useDispatch();
    const { uid } = useSelector((state: RootState) => state.admin);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(clearAdmin());
        setMenuOpen(false);
    };

    const menuVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    return (
        <header className="w-full fixed top-0 left-0 z-50 px-4 pt-3 bg-black/70 backdrop-blur-sm border-b border-gray-800 pb-3">
            <nav className="bg-transparent">
                <ul className="flex justify-between items-center uppercase font-plex">
                    <div className="w-1/3">
                        <Link href="/" className="text-xs cursor-pointer">Carla Bru</Link>
                    </div>

                    <div className="hidden md:flex w-2/3 gap-3">
                        <Link href="/projects" className="navlist">Projects</Link>
                        <Link href="/information" className="navlist">Information</Link>
                        {uid && <button className="text-xs uppercase" onClick={handleLogout}>Logout</button>}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl">
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </ul>
                
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            className="md:hidden mt-2 flex flex-col gap-2 bg-black/90 p-4 rounded shadow-lg absolute right-4 top-16 w-40 uppercase"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Link href="/projects" onClick={() => setMenuOpen(false)} className="text-sm hover:underline">
                                Projects
                            </Link>
                            <Link href="/information" onClick={() => setMenuOpen(false)} className="text-sm hover:underline">
                                Information
                            </Link>
                            {uid && (
                                <button onClick={handleLogout} className="text-sm hover:underline text-left uppercase">
                                    Logout
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
