import '../styles/globals.css'
import Magic8Ball from '../components/eightball/Magic8Ball'
import CustomizationSidebar from '../components/customization-sidebar/CustomizationSidebar'
import UserReview from '../components/common/UserReviews'

import { GlobalProvider } from '../components/context/GlobalContext'

import { ToastContainer, Slide } from 'react-toastify'

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
              quote="This app found my lost brother, I haven't seen him in 20 years..."
              author='John Doe'
              stars={4}
            />

            <UserReview
              quote="It's actually better than using my friends' decisions."
              author="Sarah Smith"
              stars={4}
            />
          </div>
        </section>
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