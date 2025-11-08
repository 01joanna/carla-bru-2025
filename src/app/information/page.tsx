"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Information() {
    const { uid } = useSelector((state: RootState) => state.admin);
    const isAdmin = Boolean(uid);

    const [info, setInfo] = useState({
        descripcion: "",
        instagram: "",
        vimeo: "",
        email: "",
        telefono: ""
    });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            const docRef = doc(db, "informacion", "perfil");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setInfo(docSnap.data() as typeof info);
            }
            setLoading(false);
        };

        fetchInfo();
    }, []);

    const handleChange = (field: keyof typeof info, value: string) => {
        setInfo({ ...info, [field]: value });
    };

    const handleSave = async () => {
        const docRef = doc(db, "informacion", "perfil");
        await updateDoc(docRef, info);
        setEditMode(false);
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <section className="w-screen h-screen md:mx-10 mx-0 md:px-0 px-12 md:mt-0 mt-40 flex md:flex-row flex-col justify-around md:text-[12px] text-lg md:items-center items-start font-plex md:gap-0 gap-10 pb-20">
            <div className="md:w-1/3 w-full md:text-justify text-start whitespace-pre-line">
                {editMode ? (
                    <textarea
                        value={info.descripcion}
                        onChange={(e) => handleChange("descripcion", e.target.value)}
                        className="w-full h-[400px] p-2 text-white rounded border border-gray-400"
                    />
                ) : (
                    <p>{info.descripcion}</p>
                )}
            </div>

            <div className="md:w-1/3 w-full flex flex-col gap-4 md:pb-0 pb-20">
                <div>
                    <p className="font-semibold uppercase">Instagram</p>
                    {editMode ? (
                        <input
                            type="text"
                            value={info.instagram}
                            onChange={(e) => handleChange("instagram", e.target.value)}
                            className="border border-gray-400 rounded p-1 text-white w-full"
                        />
                    ) : (
                        <a
                            href={`https://instagram.com/${info.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {info.instagram}
                        </a>
                    )}
                </div>

                <div className="">
                    <p className="font-semibold uppercase">Vimeo</p>
                    {editMode ? (
                        <input
                            type="text"
                            value={info.vimeo}
                            onChange={(e) => handleChange("vimeo", e.target.value)}
                            className="border border-gray-400 rounded p-1 text-white w-full"
                        />
                    ) : (
                        <a
                            href={`https://vimeo.com/${info.vimeo.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {info.vimeo}
                        </a>
                    )}
                </div>

                <div>
                    <p className="font-semibold uppercase">E-mail</p>
                    {editMode ? (
                        <input
                            type="text"
                            value={info.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="border border-gray-400 rounded p-1 text-white w-full"
                        />
                    ) : (
                        <a
                            href={`mailto:${info.email}`}
                            className="text-blue-500 hover:underline"
                        >
                            {info.email}
                        </a>
                    )}
                </div>

                <div>
                    <p className="font-semibold uppercase">Telefono</p>
                    {editMode ? (
                        <input
                            type="text"
                            value={info.telefono}
                            onChange={(e) => handleChange("telefono", e.target.value)}
                            className="border border-gray-400 rounded p-1 text-white w-full"
                        />
                    ) : (
                        <p>{info.telefono}</p>
                    )}
                </div>

                {isAdmin && (
                    <motion.div className="flex gap-4 mt-4">
                        {editMode ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-4 py-1 border border-gray-400 rounded hover:bg-gray-200 hover:text-black transition"
                            >
                                Editar información
                            </button>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
