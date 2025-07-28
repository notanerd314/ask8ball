import Image from "next/image";
import ProjectView from "@/components/root/ProjectView";
import Tagline from "@/components/root/Tagline";
import Boombox from "@/components/root/Boombox";

export default function Home() {
  return (
    <>
      <nav className="py-6 mt-5 mb-7 relative text-center">
        <Image src="/images/logo.png" alt="Logo" width={500} height={150} className="mx-auto" />
        <Tagline />
      </nav>

      <main className="px-10 mx-auto max-w-[86rem] md:-translate-y-20 translate-0 leading-0">
        <Boombox />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <ProjectView href="/eightball" img="/images/thumbnails/8ball.png" title="The Magic 8 Ball" />
          <ProjectView href="/eightball" img="/images/thumbnails/8ball.png" title="The Magic 8 Ball" />
        </div>
      </main>
    </>
  )
}