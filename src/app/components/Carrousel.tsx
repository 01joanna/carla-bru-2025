"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/lib/projects";
import { RootState, AppDispatch } from "@/store";
import { Project } from "@/types/Project";
import Card from "./Card";

export default function Carrousel() {
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
        <section className="w-screen h-[30vh] overflow-y-hidden overflow-x-scroll z-20 relative top-0 left-0 mx-8 mt-auto pt-40">
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex overflow-x-scroll scrollbar-hide cursor-grab select-none snap-x snap-mandatory"
                >
                    {projects.map((project: Project) => (
                        <Card key={project.id} project={project} />
                    ))}
                </div>
        </section>
    );
}
