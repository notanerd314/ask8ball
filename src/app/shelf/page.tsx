import Shelf from "@/components/shelf/Shelf"

export default function Home() {
  return (
    <>
      {/* <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen gap-6 text-center text-white pointer-events-none sm:hidden bg-blue-600/95 backdrop-blur-md">
        <h2 className="text-6xl font-bold">Sorry to interrupt, but...</h2>
        <h2 className="text-3xl">Can you rotate your phone? The website will break if not.</h2>
      </div> */}

      <header className="relative py-6 mt-5 text-center mb-7">
        <img src="/images/logo.min.svg" alt="Logo" className="mx-auto mb-4" loading="lazy" />
        <h1 className="sr-only">notanerd</h1>
        <h2 className="text-3xl font-bold">this is my shelf</h2>
      </header>

      <Shelf />
    </>
  )
}
