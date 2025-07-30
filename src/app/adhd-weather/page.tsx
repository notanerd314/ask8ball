import VideoBackground from "@/components/adhd-weather/VideoBackground";

export default function Home() {
  return (
    <>
      <VideoBackground videoUrl="/videos/adhd-weather/clear_sky.webm" />

      <form className="absolute top-1/2 left-1/2 -translate-1/2 bg-black/50 text-white p-8 rounded-2xl text-center backdrop-blur-md">
        <h1 className="!text-4xl font-bold mb-2">ADHD Weather Broadcast</h1>
        <h2>Summarizes the weather in 5 words or less.</h2>
        <br />
        <input type="text" placeholder="Enter your location" className="p-3 bg-black/40 rounded-2xl w-full text-white placeholder:text-gray-400" />
      </form>
    </>
  )
}