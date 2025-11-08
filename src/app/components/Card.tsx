import { Project } from "@/types/Project";

interface ProjectCardProps {
    project: Project;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function Card({ project, onMouseEnter, onMouseLeave }: ProjectCardProps) {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="group relative min-w-[200px] max-w-[250px] h-[100px] shrink-0 snap-center mx-1 mt-auto overflow-hidden"
        >
            {project.imagenes?.[0] && (
                <img
                    src={project.imagenes[0].trim()}
                    alt={project.titulo}
                    className="object-cover w-full h-full transition-all duration-500 ease-in-out group-hover:opacity-60"
                />
            )}

            <div
                className="absolute inset-0 flex items-center justify-center text-white text-sm font-plex uppercase cursor-pointer
                opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out
                group-hover:translate-y-0 translate-y-2"
            >
                <p className="text-center drop-shadow-md">{project.titulo}</p>
            </div>
        </div>
    );
}
