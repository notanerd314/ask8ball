import Magic8Ball from '../../../components/eightball/Magic8Ball'
import PersonalityPicker from '../../../components/Personality'
import Footer from '../../../components/common/Footer'
import NavBar from '../../../components/common/NavBar'

import { EightBallProvider } from '../../../components/context/EightBallContext'

import { getPersonalityData } from '../../../lib/api'

import { ToastContainer, Slide } from 'react-toastify'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const personalityData = await getPersonalityData(slug)

  if (!personalityData) {
    return (
      <>
        <NavBar />
        <p>Personality not found</p>
      </>
    );
  }

  return (
    <>
      <NavBar />

      {/* <div className='fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 -z-50' /> */}

      <EightBallProvider personalityData={personalityData}>
        <div className="flex flex-col items-center w-full h-[96vh] overflow-hidden gap-0 pt-30 pb-3 rounded-b-[50px] mb-10 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 -z-50">
          <Magic8Ball />
          <p className='text-sm text-center text-gray-400'>
            The responses are AI-generated for entertainment purposes only. Do not take this seriously.
          </p>
          <div className='corner-bg'></div>
        </div>
      </EightBallProvider>

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