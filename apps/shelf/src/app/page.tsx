import Shelf from "@/components/Shelf"

export default function Home() {
  return (
    <>
      <header className="relative py-6 mt-5 text-center mb-7">
        <img src="/logo.min.svg" alt="Logo" className="mx-auto mb-5 md:w-md w-xl" loading="eager" />
        <h1 className="sr-only">notanerd</h1>
        <h2 className="text-5xl font-bold md:text-3xl">this is my shelf</h2>
      </header>

      <Shelf />
    </>
  )
}
