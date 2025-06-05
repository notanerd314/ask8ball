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

      {/* Article for SEO shit */}
      <main>
        <section>
          <header className='headers'>
            <h1>What Our Users Say</h1>
            <p><i>(They are VERY happy!)</i></p>
          </header>
          <div className='userReviews'>
            <UserReview
              quote="It says I'm the most handsome guy ever, but I'm not."
              author='Jake Miller'
              stars={5}
            />

            <UserReview
              quote="I used this to perform my patient's surgery."
              author="Mollie Dotson"
              stars={5}
            />

            <UserReview
              quote="It predicted our divorce, wasn't surprising though."
              author='Christine Page'
              stars={4}
            />

            <UserReview
              quote="Wow! My review is in the website!"
              author='John Doe'
              stars={3.5}
            />

            <UserReview
              quote="Whoever made this app, you should never touch programming again."
              author="twitter degenerate"
              stars={0}
            />
          </div>
        </section>
      </main>
    </>
  )
}