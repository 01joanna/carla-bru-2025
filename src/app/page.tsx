"use client"

import Carrousel from "./components/Carrousel";

export default function HomePage() {

  return (
    <main>
      <section className="relative w-screen h-screen overflow-hidden z-10 flex flex-col min-h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[2.9] lg:scale-150">
            <iframe
              src="https://player.vimeo.com/video/882106664?background=1&autoplay=1&loop=1&muted=1"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-screen h-screen pointer-events-none"
            ></iframe>
          </div>
        </div>
        <Carrousel />
      </section>
    </main>
  );
}
