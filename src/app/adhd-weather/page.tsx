import VideoBackground from "@/components/adhd-weather/VideoBackground";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Home({ searchParams }: Props) {
  const currentSearchParams: Props["searchParams"] = await searchParams;
  const location = currentSearchParams.location;

  if (location) {
    return redirect(`/adhd-weather/${location}`);
  }

  return (
    <>
      <VideoBackground videoUrl="/videos/adhd-weather/defaultbg.webm" />

      <main className="w-screen h-screen flex items-center justify-center relative">
        <form
          className="bg-black/50 text-white p-8 rounded-2xl text-center backdrop-blur-md max-w-2xl m-10 w-full z-10"
          action="/adhd-weather"
        >
          <h1 className="font-bold mb-2">ADHD Weather Broadcast</h1>
          <h2 className="text-2xl">Summarizes the weather in 5 words or less.</h2>
          <br />
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            className="p-3 bg-black/40 rounded-2xl w-full text-white placeholder:text-gray-400"
            required aria-required
            aria-label="Enter your location"
          />

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-xl font-bold bg-gradient-to-r from-blue-400/70 via-blue-500/70 to-blue-600/70 rounded-2xl text-white hover:bg-gradient-to-r hover:from-blue-400/80 hover:via-blue-500/80 hover:to-blue-600/80"
          >
            Let's go!
          </button>
        </form>
      </main>
    </>
  );
}
