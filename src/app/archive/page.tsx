"use client";
export const dynamic = "force-dynamic";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, removeProject } from "@/lib/projects";
import { RootState, AppDispatch } from "@/store";
// import Link from "next/link";

export default function Archive() {
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
<section>hola</section>
    )
}

// <section className="mt-20 ml-10 w-full font-plex">
// <div className="flex justify-between items-center mb-6 w-[80%] overflow-x-auto">
//     <h1 className="text-xs uppercase tracking-widest text-gray-400">Listado de proyectos</h1>
//     {uid && (
//         <Link
//             href="/admin/new"
//             className="text-xs border border-gray-400 rounded px-3 py-1 uppercase hover:bg-gray-200 hover:text-black transition"
//         >
//             + Añadir nuevo
//         </Link>
//     )}
// </div>

// <div className="grid grid-cols-5 gap-3 uppercase text-xs tracking-wider border-b border-gray-600 pb-2 mb-2 w-[80%]">
//     <div>AÑO</div>
//     <div>TÍTULO</div>
//     <div>CATEGORÍA</div>
//     <div>DIRECCIÓN</div>
// </div>

// {projects.length === 0 ? (
//     <p className="text-gray-500 text-xs mt-4">No hay proyectos aún.</p>
// ) : (
//     projects.map((project) => (
//         <div
//             key={project.id}
//             className="grid grid-cols-5 gap-3 text-xs items-center py-2  transition w-[80%] uppercase"
//         >
//             <div>{project.año || "-"}</div>
//             <div>{project.titulo || "-"}</div>
//             <div>{Array.isArray(project.categoria) ? project.categoria.join(", ") : project.direccion || "-"}</div>
//             <div>{Array.isArray(project.direccion) ? project.direccion.join(", ") : project.direccion || "-"}</div>


//             {uid && (
//                 <div className="flex gap-2 text-center items-center">
//                     <Link href={`/admin/edit/${project.id}`} className="text-blue-400 hover:underline">
//                         Editar
//                     </Link>
//                     <button onClick={() => handleDelete(project.id!)} className="text-red-400 hover:underline">
//                         Borrar
//                     </button>
//                 </div>
//             )}
//         </div>
//     ))
// )}
// </section>