import { db } from "../lib/firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function addProject(data: any) {
    try {
        const cleanData = {
            ...data,
            imagenes: Array.isArray(data.imagenes)
                ? data.imagenes.filter((url: string) => url.trim() !== "")
                : [],
        };

        const docRef = await addDoc(collection(db, "projects"), cleanData);
        console.log("✅ Proyecto guardado con ID:", docRef.id, cleanData);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error al añadir proyecto:", error);
        throw error;
    }
}
export async function updateProject(id: string, data: any) {
    const ref = doc(db, "projects", id);
    await updateDoc(ref, data);
}

export async function deleteProject(id: string) {
    const ref = doc(db, "projects", id);
    await deleteDoc(ref);
}