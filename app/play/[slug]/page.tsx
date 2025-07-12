import MainEightBall from '../../../components/eightball/MainEightBall'
import PersonalityPicker from '../../../components/eightball/PersonalityPicker'
import Footer from '../../../components/common/Footer'
import NavBar from '../../../components/common/NavBar'

import { getPersonalityData } from '../../../lib/api'

import { ToastContainer, Slide } from 'react-toastify'

/** 
 * Dynamic personality page component
 * @param params - Route parameters containing personality slug
 * @returns Promise resolving to JSX element for personality-specific eight ball page
 */
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

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
      <h1 className='absolute opacity-0'>{`Ask the ${personalityData.name} Eight Ball`}</h1>
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