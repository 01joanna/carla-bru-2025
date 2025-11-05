"use client";
import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { addProject } from "@/services/fireAdmin";

export default function New() {
    const { isAdmin } = useSelector((state: RootState) => state.admin);

    const [direccion, setDireccion] = useState<string[]>([""]);
    const [produccion, setProduccion] = useState<string[]>([""]);
    const [direccionArte, setDireccionArte] = useState<string[]>([""]);
    const [ayudanteArte, setAyudanteArte] = useState<string[]>([""]);
    const [imagenes, setImagenes] = useState<string[]>([""]);
    const [categoria, setCategoria] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleCategoriaChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setCategoria((prev) =>
            checked ? [...prev, name] : prev.filter((cat) => cat !== name)
        );
    };

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
        const newImagenes = [...imagenes];
        newImagenes[index] = value;
        setImagenes(newImagenes);
    };
    const handleRemoveImage = (index: number) =>
        setImagenes((prev) => prev.filter((_, i) => i !== index));


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        const projectData = {
            titulo: formData.get("titulo"),
            año: formData.get("año"),
            artista: formData.get("artista"),
            direccion,
            produccion,
            direccionArte,
            ayudanteArte,
            video: formData.get("video"),
            descripcion: formData.get("descripcion"),
            imagenes,
            categoria,
            createdAt: new Date().toISOString(),
        };

        try {
            await addProject(projectData);
            alert("✅ Proyecto añadido correctamente!");

            formRef.current?.reset();
            setDireccion([""]);
            setProduccion([""]);
            setDireccionArte([""]);
            setAyudanteArte([""]);
            setImagenes([""]);
            setCategoria([]);
        } catch (err) {
            console.error("Error al añadir proyecto:", err);
            alert("❌ Error al guardar el proyecto");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!isAdmin) {
        return (
            <section className="w-screen h-screen flex flex-col items-center justify-center text-center text-gray-400">
                <p className="text-lg uppercase mb-4">No autorizado</p>
                <p className="text-sm text-gray-500">
                    Solo el administrador puede acceder aquí.
                </p>
            </section>
        );
    }
    return (
        <section className="w-screen min-h-screen flex flex-col justify-start items-center gap-10 font-plex pt-24 pb-20">
            <h1 className="text-sm uppercase">CREA UN NUEVO PROYECTO</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="flex flex-col gap-10">
                    <div className="flex gap-10">
                        <div>
                            <h2>Ficha</h2>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    name="titulo"
                                    placeholder="TITULO"
                                    className="px-4 py-3 my-2 border border-gray-300 rounded text-xs text-white"
                                />
                                <input
                                    type="text"
                                    name="año"
                                    placeholder="AÑO"
                                    className="px-4 py-3 my-2 border border-gray-300 rounded text-xs text-white"
                                />
                                <input
                                    type="text"
                                    name="artista"
                                    placeholder="ARTISTA"
                                    className="px-4 py-3 my-2 border border-gray-300 rounded text-xs text-white"
                                />
                            </div>
                            {/* DIRECCIÓN */}
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase text-gray-400">Dirección</label>
                                    {direccion.map((dir, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={dir}
                                                onChange={(e) => handleArrayChange(setDireccion, index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded text-xs text-white"
                                            />
                                            {direccion.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveField(setDireccion, index)}
                                                    className="text-xs text-red-400 border border-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddField(setDireccion)}
                                        className="text-xs text-blue-400 border border-blue-400 px-3 py-2 rounded uppercase hover:bg-blue-400 hover:text-white transition w-fit"
                                    >
                                        + Añadir director
                                    </button>
                                </div>

                                {/* PRODUCCIÓN */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase text-gray-400">Producción</label>
                                    {produccion.map((prod, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={prod}
                                                onChange={(e) => handleArrayChange(setProduccion, index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded text-xs text-white"
                                            />
                                            {produccion.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveField(setProduccion, index)}
                                                    className="text-xs text-red-400 border border-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddField(setProduccion)}
                                        className="text-xs text-blue-400 border border-blue-400 px-3 py-2 rounded uppercase hover:bg-blue-400 hover:text-white transition w-fit"
                                    >
                                        + Añadir productor
                                    </button>
                                </div>

                                {/* DIRECCIÓN DE ARTE */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase text-gray-400">Dirección de arte</label>
                                    {direccionArte.map((art, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={art}
                                                onChange={(e) => handleArrayChange(setDireccionArte, index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded text-xs text-white"
                                            />
                                            {direccionArte.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveField(setDireccionArte, index)}
                                                    className="text-xs text-red-400 border border-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddField(setDireccionArte)}
                                        className="text-xs text-blue-400 border border-blue-400 px-3 py-2 rounded uppercase hover:bg-blue-400 hover:text-white transition w-fit"
                                    >
                                        + Añadir director/a de arte
                                    </button>
                                </div>

                                {/* AYUDANTE DE ARTE */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase text-gray-400">Ayudante de arte</label>
                                    {ayudanteArte.map((ay, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={ay}
                                                onChange={(e) => handleArrayChange(setAyudanteArte, index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded text-xs text-white"
                                            />
                                            {ayudanteArte.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveField(setAyudanteArte, index)}
                                                    className="text-xs text-red-400 border border-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition"
                                                >
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleAddField(setAyudanteArte)}
                                        className="text-xs text-blue-400 border border-blue-400 px-3 py-2 rounded uppercase hover:bg-blue-400 hover:text-white transition w-fit"
                                    >
                                        + Añadir ayudante
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* --- Extras --- */}
                    <div className="flex flex-col gap-2">
                        <h2>Extras</h2>

                        {/* Imagenes dinámicas */}
                        <div className="flex flex-col gap-2 mb-8">
                            <label className="text-xs uppercase text-gray-400">
                                Imágenes
                            </label>
                            {imagenes.map((imagen, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        name={`imagen-${index}`}
                                        placeholder={`Imagen ${index + 1}`}
                                        value={imagen}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleChangeImage(index, e.target.value)
                                        }
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded text-xs uppercase text-white"
                                    />
                                    {imagenes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="text-xs text-red-400 border border-red-400 px-2 py-1 rounded hover:bg-red-400 hover:text-white transition"
                                        >
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddImage}
                                className="text-xs text-blue-400 border border-blue-400 px-3 py-2 rounded uppercase hover:bg-blue-400 hover:text-white transition w-fit"
                            >
                                + Añadir imagen
                            </button>
                        </div>

                        <input
                            type="text"
                            name="video"
                            placeholder="Video"
                            className="px-4 py-3 border border-gray-300 rounded text-xs uppercase text-white"
                        />
                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            className="px-4 py-3 border border-gray-300 rounded text-xs uppercase text-white h-50"
                        />

                        <p className="uppercase pt-10">Categoría</p>
                        <div className="text-sm uppercase flex flex-col gap-2">
                            <label>
                                <input
                                    type="checkbox"
                                    name="Videoclip"
                                    checked={categoria.includes("Videoclip")}
                                    onChange={handleCategoriaChange}
                                    className="mr-2"
                                />
                                Videoclip
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Publicidad"
                                    checked={categoria.includes("Publicidad")}
                                    onChange={handleCategoriaChange}
                                    className="mr-2"
                                />
                                Publicidad
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Ficcion"
                                    checked={categoria.includes("Ficcion")}
                                    onChange={handleCategoriaChange}
                                    className="mr-2"
                                />
                                Ficción
                            </label>
                        </div>
                    </div>
                </div>

                <br />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-500 text-white rounded py-2 px-5 m-2 text-sm uppercase ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isSubmitting ? "Enviando..." : "Añadir proyecto"}
                </button>
            </form>
        </section>
    );
}
