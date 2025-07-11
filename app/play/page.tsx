import PersonalityPicker from '../../components/eightball/PersonalityPicker'
import Footer from '../../components/common/Footer'
import NavBar from '../../components/common/NavBar'

import { getPersonalityData } from '../../lib/api'
import { generateMetadata as generateMeta, generateStructuredData } from '../../lib/utils/meta'

import { ToastContainer, Slide } from 'react-toastify'
import MainEightBall from '../../components/eightball/MainEightBall'

export const metadata = generateMeta({
  title: 'Play Magic 8 Ball - Ask the AI Oracle',
  description: 'Ask questions to the AI-powered Magic 8 Ball and get mystical answers. Choose from different personalities including sarcastic, villainous, childish, and flattering oracles.',
  canonical: '/play',
});
/** 
 * Default play page component with sarcastic personality
 * @returns Promise resolving to JSX element for default eight ball page
 */
export default async function Page() {
  const personalityData = await getPersonalityData("sarcastic")
  if (!personalityData) { return; }

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
          <h1>Ask the Magic 8 Ball - AI-Powered Fortune Teller</h1>
          <p>
            Welcome to the ultimate Magic 8 Ball experience! Our AI-powered oracle provides 
            mystical answers to all your questions. Choose from multiple personalities including 
            sarcastic, villainous, childish, and flattering responses. Each personality offers 
            a unique perspective on your questions, making every interaction entertaining and surprising.
          </p>
          <h2>Available Magic 8 Ball Personalities</h2>
          <ul>
            <li><strong>Sarcastic:</strong> A bitter oracle with witty, dismissive responses</li>
            <li><strong>Villain:</strong> Dramatic supervillain with theatrical answers</li>
            <li><strong>Childish:</strong> Innocent 5-year-old with wild imagination</li>
            <li><strong>Flattering:</strong> Charming oracle that finds something nice to say</li>
            <li><strong>Classic:</strong> Traditional Magic 8 Ball responses</li>
          </ul>
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