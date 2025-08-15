import { ProjectPreview } from "@/components/shelf/ProjectPreview";
import Boombox from "@/components/shelf/Boombox";
import ShelfSection from "@/components/shelf/ShelfSection";
import Clicker from "@/components/shelf/Clicker";

export default function Shelf() {
  return (
    <main className="max-w-4xl px-10 mx-auto space-y-5">
      <ShelfSection>
        <ProjectPreview title="Magic 8 Ball" img="/images/thumbnails/8ball.png" href="/eightball" />
        <div className="mr-3" />
        <Boombox />
        <div className="mr-1" />
        <ProjectPreview title="Flag Generator" img="/images/thumbnails/placeholder.png" href="/flag-generator" />
      </ShelfSection>

      <ShelfSection>
        <div className="ml-15" />
        <Clicker />
      </ShelfSection>
    </main>
  )
}