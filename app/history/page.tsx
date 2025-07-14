import Footer from "../../components/common/Footer";
import NavBar from "../../components/common/NavBar"
import PersonalHistoryList from "../../components/PersonalHistoryList";

export default async function Page() {
  return (
    <div className="min-h-screen pt-32 relative">
      {/* Background */}
      <div
        className="fixed inset-0 w-full h-full opacity-80 -z-50"
        style={{
          background: "linear-gradient(to bottom right, #5A1181, #1E3A8A, #3730A3)",
        }}
      />

      <NavBar />

      <h1 className="text-center !text-4xl font-bold mt-8 !mb-3">Personal History</h1>
      <p className="text-center text-xl text-white/40">View your personal <i>embarassing</i> history of responses</p>

      <PersonalHistoryList />

      <Footer />
    </div>
  );
}
