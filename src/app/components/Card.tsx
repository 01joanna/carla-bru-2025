import { Project } from "@/types/Project";
import Link from "next/link";

interface ProjectCardProps {
    project: Project;
}

export default function Card({ project }: ProjectCardProps) {
    return (
        <div className="group relative min-w-[200px] max-w-[250px] h-[100px] shrink-0 snap-center mx-1 mt-auto overflow-hidden rounded-lg">
            {project.imagenes?.[0] && (
                <img
                    src={project.imagenes[0].trim()}
                    alt={project.titulo}
                    className="object-cover w-full h-full transition-all duration-500 ease-in-out group-hover:opacity-60"
                />
            )}

            <div
                // Link href={`/projects/${project.id}`}
                className="absolute inset-0 flex items-center justify-center text-white text-sm font-plex uppercase cursor-pointer
                opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out
                group-hover:translate-y-0 translate-y-2"
            >
                <p className="text-center drop-shadow-md">{project.titulo}</p>
            </div>
        </div>
    );
}
