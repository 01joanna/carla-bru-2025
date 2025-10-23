
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Project } from "@/types/Project";

export async function fetchProjects(): Promise<Project[]> {
    const snap = await getDocs(collection(db, "projects"));
    return snap.docs.map((p) => ({ id: p.id, ...p.data() } as Project));
}

export async function createProject(project: Omit<Project, "id">) {
    const docRef = await addDoc(collection(db, "projects"), project);
    return { id: docRef.id, ...project } as Project;
}

export async function editProject(project: Project) {
    const { id, ...data } = project;
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, data);
}

export async function removeProject(id: string) {
    await deleteDoc(doc(db, "projects", id));
}
