import { db } from "../lib/firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export async function addProject(data: any) {
    await addDoc(collection(db, "projects"), {
        ...data,
        title: data.title || "Untitled Project",
        description: data.description || "",
        images : data.images || [],
        
    });
}

export async function updateProject(id: string, data: any) {
    const ref = doc(db, "projects", id);
    await updateDoc(ref, data);
}

export async function deleteProject(id: string) {
    const ref = doc(db, "projects", id);
    await deleteDoc(ref);
}