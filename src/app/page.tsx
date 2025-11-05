
"use client"

import { useState } from "react";
import Carrousel from "./components/Carrousel";
import { Project } from "@/types/Project";

export default function HomePage() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  function getEmbedUrl(video: string) {
    if (!video) return "";
    if (video.includes("youtube.com") || video.includes("youtu.be")) {
      const videoId = video.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1`;
    } else if (video.includes("vimeo.com")) {
      const videoId = video.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1&background=1`;
    }
    return video;
  }

  return (
    <main>
      <section className="relative w-screen h-screen overflow-hidden z-10 flex flex-col min-h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[2.9] lg:scale-150">
            <iframe
              src={hoveredProject ? getEmbedUrl(hoveredProject.video || "") : "https://player.vimeo.com/video/882106664?background=1&autoplay=1&loop=1&muted=1"}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-screen h-screen pointer-events-none transition-opacity duration-500"
            ></iframe>

          </div>
        </div>
        <Carrousel setHoveredProject={setHoveredProject} />
      </section>
    </main>
  );
}
