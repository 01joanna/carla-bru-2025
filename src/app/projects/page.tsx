"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, removeProject } from '@/lib/projects';
import { RootState, AppDispatch } from "@/store";
import Link from "next/link";
import { Project } from "@/types/Project";
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectIndex() {
    const dispatch = useDispatch<AppDispatch>();
    const { projects } = useSelector((state: RootState) => state.projects);
    const { uid } = useSelector((state: RootState) => state.admin);

    const [selectedCategoria, setSelectedCategoria] = useState<string>("Todos");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        : projects?.filter(p => (p.categoria?.includes(selectedCategoria)));

    const proyectosAMostrar = selectedProject ? [selectedProject] : proyectosFiltrados;

    const categorias = Array.isArray(selectedProject?.categoria)
        ? selectedProject.categoria.join(', ')
        : selectedProject?.categoria;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };


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
                    <AnimatePresence>
                        {selectedProject ? (
                            <motion.div
                                key={selectedProject.id}
                                className="space-y-4"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <div className="text-gray-200 text-xs space-y-1 uppercase flex gap-20">
                                    <div>
                                        {selectedProject.titulo && <p><strong>Título:</strong> {selectedProject.titulo}</p>}
                                        {selectedProject.año && <p><strong>Año:</strong> {selectedProject.año}</p>}
                                        {categorias && <p><strong>Categoría:</strong> {categorias}</p>}
                                        {selectedProject.artista && (
                                            <p>
                                                <strong>Artista:</strong> {Array.isArray(selectedProject.artista) ? selectedProject.artista.join(', ') : selectedProject.artista}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <p>
                                            <strong>Dirección:</strong>{" "}
                                            {selectedProject.direccion
                                                ? Array.isArray(selectedProject.direccion)
                                                    ? selectedProject.direccion.join(", ")
                                                    : selectedProject.direccion
                                                : "—"}
                                        </p>
                                        {selectedProject.produccion && (
                                            <p>
                                                <strong>Producción:</strong> {Array.isArray(selectedProject.produccion) ? selectedProject.produccion.join(', ') : selectedProject.produccion}
                                            </p>
                                        )}
                                        {selectedProject.direccionArte && (
                                            <p>
                                                <strong>Dirección artística:</strong> {Array.isArray(selectedProject.direccionArte) ? selectedProject.direccionArte.join(', ') : selectedProject.direccionArte}
                                            </p>
                                        )}
                                        {selectedProject.ayudanteArte && (
                                            <p>
                                                <strong>Ayudante de arte:</strong> {Array.isArray(selectedProject.ayudanteArte) ? selectedProject.ayudanteArte.join(', ') : selectedProject.ayudanteArte}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {selectedProject.video ? (
                                    <iframe
                                        src={selectedProject.video}
                                        className="w-full h-[500px] object-cover"
                                    />
                                ) : (
                                    <p className="text-gray-400">No hay video disponible</p>
                                )}

                                <div className="flex gap-2 overflow-x-auto mb-4">
                                    {selectedProject.imagenes?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img.trim()}
                                            alt={`${selectedProject.titulo} ${index + 1}`}
                                            className="w-[300px] h-auto object-cover cursor-pointer hover:opacity-70 transition"
                                            onClick={() => setSelectedImage(img)} // 👉 abre el modal
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-2 gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                key={selectedCategoria}
                            >
                                {proyectosFiltrados
                                    ?.slice()
                                    .sort((a, b) => Number(a.año) - Number(b.año))
                                    .map((project) => (
                                        <motion.div
                                            key={project.id}
                                            className="relative group cursor-pointer"
                                            onClick={() => setSelectedProject(project)}
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <img
                                                src={project.imagenes[0]?.trim()}
                                                alt={project.titulo}
                                                className="w-full h-69 object-cover group-hover:opacity-70 transition"
                                            />
                                            <div className="absolute bottom-2 left-2 text-white text-sm font-plex uppercase opacity-0 group-hover:opacity-100 transition">
                                                {project.titulo}
                                            </div>

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
                                        </motion.div>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
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

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Imagen ampliada"
                            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()} // evita cerrar si clicas la imagen
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
