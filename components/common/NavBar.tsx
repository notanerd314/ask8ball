import Link from "next/link"
import Image from "next/image"

export default function NavBar() {
  return (
    <nav className="fixed flex bg-black/50 p-5 left-2.5 right-2.5 top-2.5 rounded-xl gap-2 items-center text-[1.25rem] z-50" style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
      <div className="flex items-center space-x-2">
        <Image src="/favicon.min.svg" alt="Logo" width={30} height={30} />
        <p className="font-bold">ask8ball</p>
      </div>
      <div className="h-5 mx-1 border-l-2 border-white/10" />
      <Link href="/about">about</Link>
    </nav>
  )
}
