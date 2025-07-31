import VideoBackground from "@/components/adhd-weather/VideoBackground";
import Link from "next/link";

export default async function Result({ params }: { params: { location: string } }) {
  const currentParams = await params;

  return (
    <>
      <VideoBackground videoUrl="/videos/adhd-weather/defaultbg.webm" />

      <div className="w-screen h-screen flex items-center justify-center relative">
        <main
          className="bg-black/50 text-white p-8 rounded-2xl text-center backdrop-blur-md max-w-2xl m-10 w-full z-10"
        >
          <h1>placeholder</h1>
          <Link
            href="/adhd-weather"
            className="px-4 py-2 mt-4 text-xl font-bold bg-gradient-to-r from-blue-400/70 via-blue-500/70 to-blue-600/70 rounded-2xl text-white hover:bg-gradient-to-r hover:from-blue-400/80 hover:via-blue-500/80 hover:to-blue-600/80"
          >
            Back
          </Link>
        </main>
      </div>
    </>
  );
}