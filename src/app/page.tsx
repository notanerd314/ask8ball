import Image from "next/image";
import ProjectView from "@/components/root/ProjectView";
import RandomizedDescription from "@/components/root/RandomizedDescription";

export default function Home() {
  return (
    <>
      <nav className="py-6 mt-5 mb-7 relative text-center">
        <Image src="/logo.png" alt="Logo" width={500} height={150} className="mx-auto" />
        <RandomizedDescription />
      </nav>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10 mx-auto max-w-[86rem]">
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/" img="/thumbnails/placeholder.png" title="Placeholder" />
        <ProjectView href="/eightball" img="/thumbnails/8ball.png" title="The Magic 8 Ball" />
      </main>
    </>
  )
} 