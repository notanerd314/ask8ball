import { ProjectPreview } from "./ProjectPreview";
import Boombox from "./Boombox";
import ShelfSection from "./ShelfSection";
import Clicker from "./Clicker";

export default function Shelf() {
  return (
    <main className="max-w-5xl px-10 mx-auto space-y-5">
      <ShelfSection>
        <ProjectPreview title="Magic 8 Ball" img="/thumbnails/eightball.png" href="/magic-8-ball" />
        <div className="mr-3" />
        <Boombox />
        <div className="mr-1" />
        <ProjectPreview title="Watch Paint Dry" img="/thumbnails/watch-paint-dry.png" href="/watch-paint-dry" />
      </ShelfSection>

      <ShelfSection>
        <div className="ml-15" />
        <Clicker />
        <div className="ml-20" />
        <ProjectPreview title="Fact or False" img="/thumbnails/placeholder.png" href="/fact-or-false" />
      </ShelfSection>
    </main>
  )
}