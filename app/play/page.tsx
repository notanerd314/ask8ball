import PersonalityPicker from '../../components/eightball/PersonalityPicker'
import Footer from '../../components/common/Footer'
import NavBar from '../../components/common/NavBar'

import { getPersonalityData } from '../../lib/api'

import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainEightBall from '../../components/eightball/MainEightBall'

/** 
 * Enhanced default play page component with sarcastic personality
 * @returns Promise resolving to JSX element for default eight ball page
 */
export default async function Page() {
  const personalityData = await getPersonalityData("sarcastic")
  
  if (!personalityData) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Something went wrong</h1>
          <p className="text-white/70">Unable to load the default personality.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SEO */}
      <h1 className='sr-only'>Ask the AI Magic Eight Ball</h1>
      
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