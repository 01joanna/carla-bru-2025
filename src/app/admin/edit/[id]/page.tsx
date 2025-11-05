"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProjectById, editProject } from "@/lib/projects";
import { Project } from "@/types/Project";

export default function EditProject() {
    const router = useRouter();
    const params = useParams();
    const idParam = params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    const [project, setProject] = useState<Project | null>(null);
    const [direccion, setDireccion] = useState<string[]>([""]);
    const [produccion, setProduccion] = useState<string[]>([""]);
    const [direccionArte, setDireccionArte] = useState<string[]>([""]);
    const [ayudanteArte, setAyudanteArte] = useState<string[]>([""]);
    const [imagenes, setImagenes] = useState<string[]>([""]);
    const [categoria, setCategoria] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!id) return;

        getProjectById(id).then((data) => {
            if (data) {
                setProject(data);
        
                const normalize = (value: any): string[] =>
                    Array.isArray(value)
                        ? value
                        : value
                        ? [String(value)]
                        : [""];
        
                setDireccion(normalize(data.direccion));
                setProduccion(normalize(data.produccion));
                setDireccionArte(normalize(data.direccionArte));
                setAyudanteArte(normalize(data.ayudanteArte));
                setImagenes(Array.isArray(data.imagenes) && data.imagenes.length ? data.imagenes : [""]);
                setCategoria(normalize(data.categoria));
            }
        }); 
    }, [id]);

    const handleArrayChange = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        index: number,
        value: string
    ) => {
        setter((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
        setter((prev) => [...prev, ""]);

    const handleRemoveField = (
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        index: number
    ) => setter((prev) => prev.filter((_, i) => i !== index));

    const handleAddImage = () => setImagenes((prev) => [...prev, ""]);
    const handleChangeImage = (index: number, value: string) => {
        const newImgs = [...imagenes];
        newImgs[index] = value;
        setImagenes(newImgs);
    };
    const handleRemoveImage = (index: number) =>
        setImagenes((prev) => prev.filter((_, i) => i !== index));

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (checked) {
            setCategoria((prev) => [...prev, name]);
        } else {
            setCategoria((prev) => prev.filter((cat) => cat !== name));
        }
    };

    const handleChange = (field: keyof Project, value: any) => {
        if (!project) return;
        setProject({ ...project, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project || isSubmitting) return;
        setIsSubmitting(true);

        try {
            await editProject({
                ...project,
                direccion,
                produccion,
                direccionArte,
                ayudanteArte,
                imagenes,
                categoria,
            });
            alert("✅ Proyecto actualizado!");
            router.push("/projects");
        } catch (err) {
            console.error(err);
            alert("❌ Error al actualizar el proyecto");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!project) return <p className="mt-20 text-center">Cargando...</p>;

    return (
        <section className="w-screen min-h-screen flex flex-col justify-start items-center gap-10 font-plex pt-24 pb-20">
            <h1 className="text-sm uppercase mb-4">Editar proyecto</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* --- Ficha principal --- */}
                <div className="flex gap-2">
                <input
                    type="text"
                    value={project.titulo}
                    onChange={(e) => handleChange("titulo", e.target.value)}
                    placeholder="Título"
                    className="px-4 py-3 border border-gray-300 rounded text-xs"
                />
                <input
                    type="number"
                    value={project.año}
                    onChange={(e) => handleChange("año", Number(e.target.value))}
                    placeholder="Año"
                    className="px-4 py-3 border border-gray-300 rounded text-xs"
                />
                <input
                    type="text"
                    value={project.artista}
                    onChange={(e) => handleChange("artista", e.target.value)}
                    placeholder="Artista"
                    className="px-4 py-3 border border-gray-300 rounded text-xs"
                />
                </div>

                {/* --- Dirección / Producción / Arte / Ayudante --- */}
                <div className="flex flex-col gap-4">
                    {/* Dirección */}
                    <div>
                        <label className="text-xs uppercase text-gray-400">Dirección</label>
                        {direccion ? ( direccion.map((dir, index) => (
                            <div key={index} className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    value={dir}
                                    onChange={(e) => handleArrayChange(setDireccion, index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-xs"
                                />
                                {direccion.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField(setDireccion, index)}
                                        className="px-2 py-1 text-red-500 border border-red-500 rounded text-xs"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))) : (
                            <p>no</p>
                        )
                        }
                        <button
                            type="button"
                            onClick={() => handleAddField(setDireccion)}
                            className="px-3 py-2 mt-2 text-blue-500 border border-blue-500 rounded text-xs"
                        >
                            + Añadir director
                        </button>
                    </div>

                    {/* Producción */}
                    <div>
                        <label className="text-xs uppercase text-gray-400">Producción</label>
                        {produccion.map((prod, index) => (
                            <div key={index} className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    value={prod}
                                    onChange={(e) => handleArrayChange(setProduccion, index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-xs"
                                />
                                {produccion.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField(setProduccion, index)}
                                        className="px-2 py-1 text-red-500 border border-red-500 rounded text-xs"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddField(setProduccion)}
                            className="px-3 py-2 mt-2 text-blue-500 border border-blue-500 rounded text-xs"
                        >
                            + Añadir productor
                        </button>
                    </div>

                    {/* Dirección de arte */}
                    <div>
                        <label className="text-xs uppercase text-gray-400">Dirección de arte</label>
                        {direccionArte.map((dirArt, index) => (
                            <div key={index} className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    value={dirArt}
                                    onChange={(e) => handleArrayChange(setDireccionArte, index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-xs"
                                />
                                {direccionArte.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField(setDireccionArte, index)}
                                        className="px-2 py-1 text-red-500 border border-red-500 rounded text-xs"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddField(setDireccionArte)}
                            className="px-3 py-2 mt-2 text-blue-500 border border-blue-500 rounded text-xs"
                        >
                            + Añadir director/a de arte
                        </button>
                    </div>

                    {/* Ayudante de arte */}
                    <div>
                        <label className="text-xs uppercase text-gray-400">Ayudante de arte</label>
                        {ayudanteArte.map((ay, index) => (
                            <div key={index} className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    value={ay}
                                    onChange={(e) => handleArrayChange(setAyudanteArte, index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-xs"
                                />
                                {ayudanteArte.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField(setAyudanteArte, index)}
                                        className="px-2 py-1 text-red-500 border border-red-500 rounded text-xs"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => handleAddField(setAyudanteArte)}
                            className="px-3 py-2 mt-2 text-blue-500 border border-blue-500 rounded text-xs"
                        >
                            + Añadir ayudante
                        </button>
                    </div>
                </div>

                {/* --- Extras --- */}
                <div className="flex flex-col gap-4">
                    {/* Imagenes dinámicas */}
                    <div>
                        <label className="text-xs uppercase text-gray-400">Imágenes</label>
                        {imagenes.map((img, index) => (
                            <div key={index} className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => handleChangeImage(index, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-xs"
                                />
                                {imagenes.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="px-2 py-1 text-red-500 border border-red-500 rounded text-xs"
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="px-3 py-2 mt-2 text-blue-500 border border-blue-500 rounded text-xs"
                        >
                            + Añadir imagen
                        </button>
                    </div>

                    <input
                        type="text"
                        value={project.video || ""}
                        onChange={(e) => handleChange("video", e.target.value)}
                        placeholder="Video URL"
                        className="px-4 py-3 border border-gray-300 rounded text-xs"
                    />
                    <textarea
                        value={project.descripcion || ""}
                        onChange={(e) => handleChange("descripcion", e.target.value)}
                        placeholder="Descripción"
                        className="px-4 py-3 border border-gray-300 rounded text-xs h-40"
                    />

                    <p className="uppercase pt-2 text-xs">Categorías</p>
                    <div className="flex flex-col gap-2 text-xs">
                        {["Videoclip", "Publicidad", "Ficcion"].map((cat) => (
                            <label key={cat}>
                                <input
                                    type="checkbox"
                                    name={cat}
                                    checked={categoria.includes(cat)}
                                    onChange={handleCategoriaChange}
                                    className="mr-2"
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-blue-500 text-white rounded text-xs uppercase ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>
        </section>
    );
}
