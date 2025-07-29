import Image from "next/image";
import { ProjectPreview, Placeholder } from "@/components/root/ProjectPreview";
import Tagline from "@/components/root/Tagline";
import Boombox from "@/components/root/Boombox";

export default function Home() {
  return (
    <>
      <nav className="py-6 mt-5 mb-7 relative text-center">
        <Image src="/images/logo.webp" alt="Logo" width={500} height={150} className="mx-auto" />
        <Tagline />
      </nav>

      <main className="relative px-10 mx-auto max-w-4xl leading-none">
        {/* Decorative Shelves */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="flex flex-col lg:gap-26 sm:gap-46 gap-38">
            <div />
            <img src="/images/shelf.png" alt="Shelf" className="w-full drop-shadow-2xl" />
            <img src="/images/shelf.png" alt="Shelf" className="w-full rotate-2  drop-shadow-2xl" />
            <img src="/images/shelf.png" alt="Shelf" className="w-full  drop-shadow-2xl" />
            {/* Add more shelves if needed */}
          </div>
        </div>

        {/* Project Grid */}
        <div className="relative z-10 grid lg:grid-cols-3 grid-cols-2 gap-x-6 gap-y-20 justify-center items-end">
          <ProjectPreview title="Magic 8 Ball" img="/images/thumbnails/placeholder.png" href="/eightball" />
          <ProjectPreview title="Magic 8 Ball" img="/images/thumbnails/placeholder.png" href="/eightball" />
          <ProjectPreview title="Magic 8 Ball" img="/images/thumbnails/placeholder.png" href="/eightball" />
          <Placeholder />
          <Boombox />
          <ProjectPreview title="Magic 8 Ball" img="/images/thumbnails/placeholder.png" href="/eightball" />
          {/* Keep adding cards, no need to touch shelves */}
        </div>
      </main>
    </>
  )
}