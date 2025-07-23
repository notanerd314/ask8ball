import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="p-4 fixed z-50">
      <Link href="/" className="flex items-center gap-2.5 text-2xl font-semibold">
        <Image
          src="/favicon.min.svg"
          alt="Logo"
          width={45}
          height={45}
          className="border-2 rounded-full border-white/20"
        />
        ask8ball
      </Link>
    </nav>
  )
}