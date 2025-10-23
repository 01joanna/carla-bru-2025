import { fetchProjects } from "@/services/firestore";
import { Project } from "@/types/Project";
import React, { useEffect, useState } from "react";

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (err: any) {
                setError(err.message || "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return { projects, loading, error };
}
