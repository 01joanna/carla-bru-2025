"use client"
import { useEffect, useState } from "react";
import { fetchProjects } from "@/services/firestore";
import {Project } from "@/types/Project";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <main>
      <h1>Proyectos</h1>
      {projects.map((p) => (
        <div key={p.id}>
          <h2>{p.titulo}</h2>
        </div>
      ))}
    </main>
  );
}
