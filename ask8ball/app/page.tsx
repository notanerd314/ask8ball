import '../styles/globals.css'
import Magic8Ball from '../components/eightball/Magic8Ball'
import CustomizationSidebar from '../components/customization-sidebar/CustomizationSidebar'
import UserReview from '../components/common/UserReviews'

import { GlobalProvider } from '../components/context/GlobalContext'

import { ToastContainer, Slide } from 'react-toastify'
import { transform } from 'next/dist/build/swc/generated-native'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <div className="flex flex-row items-center w-full h-full mb-5 overflow-hidden max-xl:flex-col max-xl:h-auto">
          <Magic8Ball />
          <CustomizationSidebar />
        </div>

      </GlobalProvider>

      {/* Article for SEO shit */}
      <main className="relative left-1/2 min-w-0">
        <section>
          <header>
            <h1 className='text-center font-bold text-5xl'>What Our Users Say</h1>
          </header>
          <div className='grid gap-4 p-4' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
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
              quote="It's actually better than my friends' decisions."
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