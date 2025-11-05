"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, removeProject } from "@/lib/projects";
import { RootState, AppDispatch } from "@/store";
import Link from "next/link";

export default function ProjectIndex() {
    const dispatch = useDispatch<AppDispatch>();
    const { projects } = useSelector((state: RootState) => state.projects);
    const { uid } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que quieres borrar este proyecto?")) {
            try {
                await removeProject(id);
                dispatch(fetchProjects());
            } catch (error) {
                alert("Error al borrar el proyecto.");
            }
        }
    };

    return (
        <section className="mt-20 px-20 w-full font-plex">
            <div className="flex justify-between items-center mb-6 w-full overflow-x-auto">
                <h1 className="text-xs uppercase tracking-widest text-gray-400">
                    Listado de proyectos
                </h1>
                {uid && (
                    <Link
                        href="/admin/new"
                        className="text-xs border border-gray-400 rounded px-3 py-1 uppercase hover:bg-gray-200 hover:text-black transition"
                    >
                        + Añadir nuevo
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {projects && projects.map((project) => (
                    <div key={project.id} className="relative group">
                        {project.imagenes?.[0] ? (
                            <img
                                src={project.imagenes[0].trim()}
                                alt={project.titulo}
                                className="w-full h-69 object-cover rounded-lg shadow-md group-hover:opacity-70 transition"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                Sin imagen
                            </div>
                        )}
                        <div className="absolute bottom-2 left-2 text-white text-sm font-plex uppercase opacity-0 group-hover:opacity-100 transition">
                            {project.titulo}
                        </div>
                        {uid && (
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <Link href={`/admin/edit/${project.id}`} className="text-blue-400 text-xs hover:underline">
                                    Editar
                                </Link>
                                <button onClick={() => handleDelete(project.id!)} className="text-red-400 text-xs hover:underline">
                                    Borrar
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
