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

      {/* Reviews */}
      <section>
        <header>
          <h1 className='headers'>Our Loyal Users Reviews</h1>
        </header>
        <div className='userReviews'>
          <UserReview
            quote="This app ruined my career and I'm now out here selling popsicles!"
            author='John Doe'
            stars={4}
          />

          <UserReview
            quote="Got hospitalized with this one, it was not a fun experience."
            author='Saul Shepard'
            stars={1}
          />

          <UserReview
            quote="Whoever created this, never code again."
            author="angry twitter user"
            stars={0}
          />

          <UserReview
            quote="meow meow meow meow meow meow meow meow meow"
            author='my cat'
            stars={5}
          />

          <UserReview
            quote="IT CAN'T STOP SAYING I'M UGLY, YOU SAID IT'S RANDOMIZED!!!!!"
            author='Jake Miller'
            stars={3}
          />
        </div>
      </section>

      {/* Article for SEO shit */}
      <main></main>
    </>
  )
}