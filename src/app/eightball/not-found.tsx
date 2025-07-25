import PersonalitySelector from "@/components/eightball/PersonalitySelector";
import Footer from "@/components/eightball/Footer";
import NavBar from "@/components/eightball/NavBar";

export default function Home() {

  return (
    <>
      <NavBar />

      <main
        className="flex flex-col gap-6 items-center justify-center h-screen"
        style={{ background: "linear-gradient(135deg, #2e2e2e, #4a4a4a, #6e6e6e)", opacity: 0.95 }}
      >
        <div className="text-center space-y-4 px-3">
          <h1 className="text-shadow-lg">Buddy… that’s not a real personality.</h1>
          <p className="text-2xl text-shadow-lg">We only have THESE personalities available.</p>
        </div>

        <PersonalitySelector />
      </main>

      <Footer />
    </>
  );
}
