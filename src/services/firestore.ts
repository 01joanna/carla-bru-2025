import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Project } from "@/types/Project";

export async function fetchProjects(): Promise<Project[]> {
    const snap = await getDocs(collection(db, "projects"));

    const projects: Project[] = snap.docs.map((p) => {
        const data = p.data() as Omit<Project, "id">;
        return {
            id: p.id,
            ...data
        };
    });

    console.log(projects);
    return projects;
}
