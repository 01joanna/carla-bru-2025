
"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/lib/projects";
import { RootState, AppDispatch } from "@/store";
import { Project } from "@/types/Project";
import Card from "./Card";

interface CarrouselProps {
    setHoveredProject: (project: Project | null) => void;
}

export default function Carrousel({ setHoveredProject }: CarrouselProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { projects } = useSelector((state: RootState) => state.projects);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    let isDown = false;
    let startX: number, scrollLeft: number;

    const handleMouseDown = (e: React.MouseEvent) => {
        isDown = true;
        scrollRef.current?.classList.add("cursor-grabbing");
        startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
        scrollLeft = scrollRef.current?.scrollLeft || 0;
    };

    const handleMouseLeave = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
        isDown = false;
        scrollRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section className="w-screen">
            <div className="md:flex hidden ml-20 mb-3 w-screen h-auto md:h-[96vh] overflow-y-auto md:overflow-y-hidden overflow-x-scroll md:overflow-x-scroll z-20 relative top-0 left-0 mt-auto">
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className=" flex flex-col md:flex-row md:overflow-x-scroll overflow-y-auto md:overflow-y-hiddenscrollbar-hide cursor-grab select-none snap-y md:snap-x snap-mandatory justify-center items-center">
                    {projects
                        .filter(project => project.selected && project.video)
                        .map(project => (
                            <Card
                                key={project.id}
                                project={project}
                                onMouseEnter={() => setHoveredProject(project)}
                            />
                        ))}
                </div>
            </div>

                <ul className="flex flex-col gap-2 md:hidden mt-4 justify-end w-screen h-screen relative top-0 left-0 z-100 px-4 uppercase">
                    {projects
                        .filter(project => project.selected && project.video)
                        .map(project => (
                            <li
                                key={project.id}
                                className="text-sm text-white cursor-pointer hover:underline"
                                onClick={() => setHoveredProject(project)}
                            >
                                {project.titulo}
                            </li>
                        ))}
                </ul>
        </section>
    );
}
