import PersonalityPicker from '../../components/eightball/PersonalityPicker'
import Footer from '../../components/common/Footer'
import NavBar from '../../components/common/NavBar'

import { getPersonalityData } from '../../lib/api'

import { ToastContainer, Slide } from 'react-toastify'
import MainEightBall from '../../components/eightball/MainEightBall'

/** 
 * Default play page component with sarcastic personality
 * @returns Promise resolving to JSX element for default eight ball page
 */
export default async function Page() {
  const personalityData = await getPersonalityData("sarcastic")
  if (!personalityData) { return; }

  return (
    <>
      <h1 className='absolute opacity-0'>{`Ask the Eight Ball`}</h1>
      <NavBar />

      {/* <div className='fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 -z-50' /> */}

      <MainEightBall personalityData={personalityData} />
      <PersonalityPicker />

      {/* Article for SEO */}
      <main className="w-full p-0">
        <Footer />
      </main>

      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        transition={Slide}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName={'toast'}
      />
    </>
  )
}