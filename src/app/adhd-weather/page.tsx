import VideoBackground from "@/components/adhd-weather/VideoBackground";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center relative">
      <VideoBackground videoUrl="/videos/adhd-weather/defaultbg.webm" />

      <form className="bg-black/50 text-white p-8 rounded-2xl text-center backdrop-blur-md max-w-2xl m-10 w-full z-10">
        <h1 className="font-bold mb-2">ADHD Weather Broadcast</h1>
        <h2 className="text-2xl">Summarizes the weather in 5 words or less.</h2>
        <br />
        <input
          type="text"
          placeholder="Enter your location"
          className="p-3 bg-black/40 rounded-2xl w-full text-white placeholder:text-gray-400"
          required aria-required
          aria-label="Enter your location"
        />
      </form>
    </main>
  );
}
