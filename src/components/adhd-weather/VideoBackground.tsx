export default function VideoBackground({ videoUrl }: { videoUrl: string }) {
  return (
    <>
      <video muted loop playsInline autoPlay preload="auto" className="fixed -z-50 w-screen h-screen overflow-hidden object-cover top-0 left-0">
        <source src={videoUrl} type="video/webm" />
      </video>
    </>
  );
}