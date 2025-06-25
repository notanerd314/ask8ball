import PersonalityPicker from '../../components/eightball/PersonalityPicker'
import Footer from '../../components/common/Footer'
import NavBar from '../../components/common/NavBar'

import { getPersonalityData } from '../../lib/api'

import { ToastContainer, Slide } from 'react-toastify'
import MainEightBall from '../../components/eightball/MainEightBall'

export default async function Page() {
  const personalityData = await getPersonalityData("sarcastic")

  if (!personalityData) {
    return (
      <>
        <NavBar />
        <p>Personality not found</p>
      </>
    );
  }

  console.log(personalityData)

  return (
    <>
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