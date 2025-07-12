import NavBar from '../../components/common/NavBar'
import Footer from '../../components/common/Footer'

/** 
 * About page component
 * @returns JSX element for about page
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <NavBar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              About ask8ball
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              The AI-powered Magic 8 Ball that brings personality to fortune telling
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-12">
            <section className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">What is ask8ball?</h2>
              <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                <p>
                  ask8ball is a modern twist on the classic Magic 8 Ball toy. Instead of generic responses, 
                  our AI-powered oracle comes with distinct personalities that each bring their own unique 
                  perspective to your questions.
                </p>
                <p>
                  Whether you want sarcastic wit, childish enthusiasm, villainous schemes, or flattering 
                  encouragement, we've got a personality that matches your mood.
                </p>
              </div>
            </section>

            <section className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">How it works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="text-4xl">🎭</div>
                  <h3 className="text-xl font-semibold text-white">Choose a Personality</h3>
                  <p className="text-white/70">Pick from our collection of unique AI personalities</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-4xl">❓</div>
                  <h3 className="text-xl font-semibold text-white">Ask Your Question</h3>
                  <p className="text-white/70">Type in anything you're curious about</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="text-4xl">🎱</div>
                  <h3 className="text-xl font-semibold text-white">Get Your Answer</h3>
                  <p className="text-white/70">Receive a personalized response with flair</p>
                </div>
              </div>
            </section>

            <section className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Our Personalities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    😒 Sarcastic <span className="text-sm bg-yellow-400 text-black px-2 py-1 rounded-full">Fan Favorite</span>
                  </h3>
                  <p className="text-white/70">A bitter 8-ball who hates everything and everyone</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">😉 Flattering</h3>
                  <p className="text-white/70">A charming 8-ball that always finds something nice to say</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">😈 Villain</h3>
                  <p className="text-white/70">An overly dramatic supervillain with secret plans</p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">👶 Childish</h3>
                  <p className="text-white/70">A wholesome 5-year-old with too much sugar</p>
                </div>
              </div>
            </section>

            <section className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Important Disclaimer</h2>
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-6">
                <p className="text-yellow-200 text-lg leading-relaxed">
                  🔮 <strong>For Entertainment Only:</strong> The responses are AI-generated for fun and entertainment. 
                  Please don't make important life decisions based on what a digital magic 8-ball tells you! 
                  (But do enjoy the experience.) ✨
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}