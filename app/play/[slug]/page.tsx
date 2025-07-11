import MainEightBall from '../../../components/eightball/MainEightBall'
import PersonalityPicker from '../../../components/eightball/PersonalityPicker'
import Footer from '../../../components/common/Footer'
import NavBar from '../../../components/common/NavBar'

import { getPersonalityData } from '../../../lib/api'
import { generateMetadata as generateMeta, generateStructuredData } from '../../../lib/utils/meta'

import { ToastContainer, Slide } from 'react-toastify'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const personalityData = await getPersonalityData(params.slug);
  
  if (!personalityData) {
    return generateMeta({
      title: 'Personality Not Found - Ask the 8 Ball',
      description: 'The requested Magic 8 Ball personality could not be found.',
      noIndex: true,
    });
  }

  return generateMeta({
    personality: personalityData,
    canonical: `/play/${params.slug}`,
  });
}
/** 
 * Dynamic personality page component
 * @param params - Route parameters containing personality slug
 * @returns Promise resolving to JSX element for personality-specific eight ball page
 */
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

  const structuredData = generateStructuredData(personalityData);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <NavBar />


      <MainEightBall personalityData={personalityData} />

      <PersonalityPicker />

      <main className="w-full p-0" role="main">
        <article className="sr-only">
          <h1>Ask the {personalityData.name} Magic 8 Ball</h1>
          <p>
            Experience the mystical power of the {personalityData.name} Magic 8 Ball. 
            {personalityData.description} Ask any question and receive AI-powered responses 
            that will entertain and surprise you. This interactive fortune teller combines 
            artificial intelligence with classic divination for a unique experience.
          </p>
          <h2>How to Use the {personalityData.name} 8 Ball</h2>
          <ol>
            <li>Think of a question you'd like answered</li>
            <li>Type your question in the input field</li>
            <li>Click the Magic 8 Ball or press Enter</li>
            <li>Watch as the {personalityData.name} oracle reveals your answer</li>
          </ol>
          <h2>About {personalityData.name} Personality</h2>
          <p>{personalityData.description}</p>
        </article>
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