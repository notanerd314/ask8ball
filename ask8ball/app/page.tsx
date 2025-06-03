import '../styles/globals.css'
import Magic8Ball from '../components/eightball/Magic8Ball'
import CustomizationSidebar from '../components/CustomizationSidebar'
import UserReview from '../components/UserReviews'

import { GlobalProvider } from '../components/context/GlobalContext'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <div className='main'>
          <Magic8Ball />
          <CustomizationSidebar />
        </div>
      </GlobalProvider>
      <section>
        <div className='userReviews'>
          <UserReview quote='I am a quote' author='John Doe' stars={4} />
        </div>
      </section>
    </>
  )
}