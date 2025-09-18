import PersonalitySelector from "@/components/PersonalitySelector";

export default function Home() {
  return (
    <>
      <main
        className="flex flex-col items-center justify-center h-screen gap-6"
        style={{ background: "linear-gradient(135deg, #2e2e2e, #4a4a4a, #6e6e6e)", opacity: 0.95 }}
      >
        <div className="px-3 text-center space-y-4">
          <h1 className="text-shadow-lg">Buddy… that’s not a real personality.</h1>
          <p className="text-2xl text-shadow-lg">We only have THESE personalities available.</p>
        </div>

        <PersonalitySelector />
      </main>
    </>
  );
}
