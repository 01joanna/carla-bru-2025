"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, removeProject } from '@/lib/projects';
import { RootState, AppDispatch } from "@/store";
import Link from "next/link";
import { Project } from "@/types/Project";

export default function ProjectIndex() {
    const dispatch = useDispatch<AppDispatch>();
    const { projects } = useSelector((state: RootState) => state.projects);
    const { uid } = useSelector((state: RootState) => state.admin);

    const [selectedCategoria, setSelectedCategoria] = useState<string>("Todos");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que quieres borrar este proyecto?")) {
            try {
                await removeProject(id);
                dispatch(fetchProjects());
                setSelectedProject(null);
            } catch (error) {
                alert("Error al borrar el proyecto.");
            }
        }
    };

    const categoriasCount = projects?.reduce((acc: Record<string, number>, project) => {
        const categoria = project.categoria?.[0] || "Sin categoría";
        acc[categoria] = (acc[categoria] || 0) + 1;
        return acc;
    }, {}) || {};

    const proyectosFiltrados = selectedCategoria === "Todos"
        ? projects
        : projects?.filter(p => (p.categoria?.[0] || "Sin categoría") === selectedCategoria);

    const proyectosAMostrar = selectedProject ? [selectedProject] : proyectosFiltrados;

    return (
        <section className="mt-20 px-20 w-full font-plex">
            <div className="flex justify-between items-center mb-6 w-full overflow-x-auto">
                <h1 className="text-xs uppercase tracking-widest text-gray-400">
                    Proyectos
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

            <div className="flex gap-8 justify-between">
                <div className="w-4/6 space-y-12">
                    <div className="grid grid-cols-2 gap-6">
                        {proyectosAMostrar
                            ?.slice()
                            .sort((a, b) => Number(a.año) - Number(b.año))
                            .map((project) => (
                                <div
                                    key={project.id}
                                    className="relative group cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                        <img
                                            src={project.imagenes[0].trim()}
                                            alt={project.titulo}
                                            className="w-full h-69 object-cover group-hover:opacity-70 transition"
                                        />
                                    <div className="absolute bottom-2 left-2 text-white text-sm font-plex uppercase opacity-0 group-hover:opacity-100 transition">
                                        {project.titulo}
                                    </div>
                                    {selectedProject && (
                                        <div className="mt-2 text-gray-200 text-sm">
                                            <p>Año: {project.año}</p>
                                            <p>{project.descripcion}</p>
                                        </div>
                                    )}
                                    {uid && (
                                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                            <Link
                                                href={`/admin/edit/${project.id}`}
                                                className="text-blue-400 text-xs hover:underline"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id!)}
                                                className="text-red-400 text-xs hover:underline"
                                            >
                                                Borrar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>

                <div className="w-2/6">
                    <ul className="space-y-4 text-xs uppercase">
                        {Object.entries(categoriasCount).map(([categoria, count]) => {
                            const proyectosEnCategoria = projects?.filter(
                                (p) => (p.categoria?.[0] || "Sin categoría") === categoria
                            );
                            return (
                                <li key={categoria} className="cursor-pointer">
                                    <p
                                        className="text-sm"
                                        onClick={() => {
                                            setSelectedCategoria(categoria);
                                            setSelectedProject(null);
                                        }}
                                    >
                                        {categoria} ({count})
                                    </p>
                                    <ul className="mt-1 space-y-0.5 text-xs text-gray-500">
                                        {proyectosEnCategoria?.map((p) => (
                                            <li
                                                key={p.id}
                                                className="hover:text-white transition cursor-pointer"
                                                onClick={() => setSelectedProject(p)}
                                            >
                                                {p.titulo}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        })}

                        <li key="todos" className="cursor-pointer pt-6">
                            <p
                                className="text-sm"
                                onClick={() => {
                                    setSelectedCategoria("Todos");
                                    setSelectedProject(null);
                                }}
                            >
                                Todos los proyectos ({projects?.length || 0})
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
