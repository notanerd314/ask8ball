import VideoBackground from "@/components/adhd-weather/VideoBackground";
import Link from "next/link";
import { allCombinations, calculateCombination } from "../helpers/types";

export default async function Result({ params }: { params: { location: string } }) {
  const currentParams = await params;
  const locationReq: any = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${currentParams.location}&count=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const locationData = await locationReq.json();
  if (!locationData.results) {
    return (
      <>
        <VideoBackground videoUrl="/videos/adhd-weather/defaultbg.webm" />

        <div className="w-screen h-screen flex items-center justify-center relative">
          <main
            className="bg-black/50 text-white p-8 rounded-2xl text-center backdrop-blur-md max-w-2xl m-10 w-full z-10"
          >
            <h1 className="mb-2">That location doesn't exist, little man.</h1>
            <h2 className="text-2xl">Come back to me when you got a proper location.</h2>
            <br />
            <Link
              href="/adhd-weather"
              className="px-4 py-2 mt-4 text-xl font-bold bg-gradient-to-r from-blue-400/70 via-blue-500/70 to-blue-600/70 rounded-2xl text-white hover:bg-gradient-to-r hover:from-blue-400/80 hover:via-blue-500/80 hover:to-blue-600/80"
            >
              Back
            </Link>
          </main>
        </div>
      </>
    )
  }

  const weatherReq: any = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${locationData.results[0].latitude}&longitude=${locationData.results[0].longitude}&current=weather_code,apparent_temperature,wind_speed_10m&timezone=auto&forecast_days=1`
  )

  const weatherData = await weatherReq.json();

  console.log(allCombinations())

  return (
    <>
      <VideoBackground videoUrl="/videos/adhd-weather/defaultbg.webm" />

      <div className="w-screen h-screen flex items-center justify-center relative">
        <main
          className="bg-black/50 text-white p-8 rounded-2xl text-center backdrop-blur-md max-w-2xl m-10 w-full z-10"
        >
          <code className="font-bold mb-2">
            {JSON.stringify(
              calculateCombination(
                parseInt(weatherData.current.weather_code), 
                parseFloat(weatherData.current.apparent_temperature), 
                parseFloat(weatherData.current.wind_speed_10m)
              )
            )}
          </code>
          <br />
          <br />
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