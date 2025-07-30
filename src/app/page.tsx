import { ProjectPreview } from "@/components/shelf/ProjectPreview";
import Boombox from "@/components/shelf/Boombox";
import Shelf from "@/components/shelf/Shelf";
import Clicker from "@/components/shelf/Clicker";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen gap-6 text-center text-white pointer-events-none sm:hidden bg-blue-600/95 backdrop-blur-md">
        <h2 className="text-6xl font-bold">Sorry to interrupt, but...</h2>
        <h2 className="text-3xl">Can you rotate your phone? The website will break if not.</h2>
      </div>

      <nav className="relative py-6 mt-5 text-center mb-7">
        <img src="/images/logo.webp" alt="Logo" className="mx-auto max-w-115" />
        <p className="text-3xl font-bold">the shelf full of random things, feel free to click</p>
      </nav>

      <main className="relative max-w-4xl px-10 mx-auto leading-none">
        <div className="relative flex flex-col gap-5">
         <Shelf>
            <ProjectPreview title="Magic 8 Ball" img="/images/thumbnails/8ball.png" href="/eightball" />
            <div className="mr-5" />
            <Boombox />
          </Shelf>

          <Shelf>
            <div className="ml-15" />
            <Clicker />
          </Shelf>
        </div>
      </main>

    </>
  )
}
