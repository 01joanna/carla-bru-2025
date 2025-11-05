
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Project } from "@/types/Project";
import { setProjects } from "@/store/slices/projectsSlice";
import { AppDispatch } from '../store/index';
import { Timestamp } from "firebase/firestore";

export const fetchProjects = () => async (dispatch: AppDispatch) => {
    try {
        const docs = await getDocs(collection(db, "projects"));
        docs.docs.forEach(doc => {
            console.log("Fetched project doc:", doc.id, doc.data());
        }
        );
        const data: Project[] = docs.docs.map(doc => {
            const d = doc.data();

            return {
                id: doc.id,
                titulo: d.titulo || "",
                año: d.año || 0,
                direccion: d.direccion || "",
                produccion: d.produccion || "",
                video: d.video || "",
                categoria: d.categoria || "",
                imagenes: Array.isArray(d.imagenes)
                    ? d.imagenes.map((url: string) => url.trim())
                    : [],
                createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toDate().toISOString() : d.createdAt,
                updatedAt: d.actualizado instanceof Timestamp ? d.actualizado.toDate().toISOString() : d.actualizado,
            };
        });

        dispatch(setProjects(data));
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
};


export async function createProject(project: Omit<Project, "id">) {
    const docRef = await addDoc(collection(db, "projects"), project);
    return { id: docRef.id, ...project } as Project;
}

export async function editProject(project: Project) {
    const { id, ...rest } = project;

    if (!id) throw new Error("El proyecto debe tener un ID");
    const dataToUpdate: Partial<Project> = {
        ...rest,
        titulo: rest.titulo || "",
        año: rest.año || "",
        direccion: rest.direccion || "",
        produccion: rest.produccion || "",
        video: rest.video || "",
        categoria: rest.categoria || "",
        imagenes: Array.isArray(rest.imagenes) ? rest.imagenes : [],
        updatedAt: new Date().toISOString(),
    };

    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, dataToUpdate);
}

export async function removeProject(id: string) {
    await deleteDoc(doc(db, "projects", id));
}

export async function getProjectById(id: string): Promise<Project | null> {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            titulo: data.titulo || "",
            año: data.año || 0,
            direccion: data.direccion || "",
            produccion: data.produccion || "",
            video: data.video || "",
            categoria: data.categoria || "",
            imagenes: Array.isArray(data.imagenes)
                ? data.imagenes.map((url: string) => url.trim())
                : [],
                createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
                updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Project;
    } else {
        return null;
    }
}
