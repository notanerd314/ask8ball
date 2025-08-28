import ProgressBar from "@/components/age-progress/ProgressBar";

export default function AgeProgress() {
  return (
    <>
      <main className="absolute top-1/2 left-1/2 -translate-1/2 space-y-5">
        <ProgressBar percent={30} />
        <h1 className="font-bold text-6xl text-center">30%</h1>
      </main>
    </>
  );
}