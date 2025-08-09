import Shelf from "@/components/shelf/Shelf"

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 -z-50 w-full h-screen overflow-hidden pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.15) 80%)"
      }}></div>

      <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen gap-6 text-center text-white pointer-events-none sm:hidden bg-blue-600/95 backdrop-blur-md">
        <h2 className="text-6xl font-bold">Sorry to interrupt, but...</h2>
        <h2 className="text-3xl">Can you rotate your phone? The website will break if not.</h2>
      </div>

      <header className="relative py-6 mt-5 text-center mb-7">
        <img src="/images/logo.webp" alt="Logo" className="mx-auto max-w-115" />
        <h1 className="sr-only">notanerd</h1>
        <h2 className="text-3xl font-bold">this is my shelf</h2>
      </header>

      <Shelf />
    </>
  )
}
