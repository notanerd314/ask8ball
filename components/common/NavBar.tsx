import Link from "next/link"

export default function NavBar() {
  return (
    <nav className='fixed flex backdrop-blur-sm dark:bg-black/40 p-5 left-2.5 right-2.5 top-2.5 rounded-xl gap-2 items-center border-2 border-white/10 text-[1.25rem] z-50'>
      <div className='flex items-center gap-2'>
        <img src="/favicon.min.svg" alt="Logo" width={30} height={30}></img>
        <p className='font-bold'>ask8ball</p>
      </div>
      <div className='h-5 mx-1 border-l-2 border-white/10' />
      <Link href="/about">about</Link>
    </nav> 
  )
}