import { ProjectPreview } from "@/components/shelf/ProjectPreview";
import Boombox from "@/components/shelf/Boombox";
import ShelfSection from "@/components/shelf/ShelfSection";
import Clicker from "@/components/shelf/Clicker";

export default function Shelf() {
  return (
    <main className="max-w-5xl px-10 mx-auto space-y-5">
      <ShelfSection>
        <ProjectPreview title="Magic 8 Ball" img="/shelf/thumbnails/eightball.png" href="/eightball" />
        <div className="mr-3" />
        <Boombox />
        <div className="mr-1" />
        <ProjectPreview title="Watch Paint Dry" img="/shelf/thumbnails/watch-paint-dry.png" href="/watch-paint-dry" />
      </ShelfSection>

      <ShelfSection>
        <div className="ml-15" />
        <Clicker />
        <div className="ml-20" />
        <ProjectPreview title="Fact or False" img="/shelf/thumbnails/placeholder.png" href="/fact-or-false" />
      </ShelfSection>
    </main>
  )
}