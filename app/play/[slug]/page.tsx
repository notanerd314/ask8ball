import MainEightBall from '../../../components/eightball/MainEightBall'
import PersonalityPicker from '../../../components/eightball/PersonalityPicker'
import Footer from '../../../components/common/Footer'
import NavBar from '../../../components/common/NavBar'

import { getPersonalityData } from '../../../lib/api'

import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/** 
 * Dynamic personality page component with enhanced layout
 * @param params - Route parameters containing personality slug
 * @returns Promise resolving to JSX element for personality-specific eight ball page
 */
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const personalityData = await getPersonalityData(slug)

  if (!personalityData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Personality Not Found</h1>
          <p className="text-white/70">The personality you're looking for doesn't exist.</p>
          <a 
            href="/play" 
            className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl transition-colors duration-200"
          >
            Choose a Different Personality
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SEO */}
      <h1 className='sr-only'>{`Ask the ${personalityData.name} Eight Ball`}</h1>
      
      {/* Navigation */}
      <NavBar />

      {/* Main Experience */}
      <MainEightBall personalityData={personalityData} />

      {/* Personality Selection */}
      <PersonalityPicker />

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="!bg-black/80 !text-white !backdrop-blur-xl !border !border-white/20 !rounded-2xl"
        progressClassName="!bg-gradient-to-r !from-purple-500 !to-pink-500"
      />
    </div>
  )
}