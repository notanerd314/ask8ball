import Link from "next/link";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <>
      <nav className="fixed z-50 p-6 w-screen">
        <Link href="/" className="text-center text-black">
          <Logo color="#000" size={75} />
          <p className="text-2xl">The Magic 8 Ball</p>
        </Link>
      </nav>
    </>
  )
}