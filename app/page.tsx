import Magic8Ball from '../components/eightball/Magic8Ball'
import UserReview from '../components/common/UserReviews'

import { GlobalProvider } from '../components/context/GlobalContext'

import { ToastContainer, Slide } from 'react-toastify'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <div className="flex flex-col items-center w-full h-screen mb-10 overflow-hidden gap-0 bg-gray-950 pb-1.5">
          <Magic8Ball />
          <p className='text-sm text-gray-400'>
            The responses is AI-generated for entertainment purposes only. Do not take this seriously.
          </p>
        </div>
      </GlobalProvider>

      {/* Article for SEO shit */}
      {/* <main className="w-full p-0">
        <section aria-details=''>
          <h1 className='text-5xl font-bold text-center'>What Our Users Say</h1>
          <div className='justify-center p-4 grid gap-4' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 300px))' }}>
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

        <section>
          <h1 className='text-5xl font-bold text-center'>Frequently Asked Questions</h1>

          <div className='flex flex-col items-center justify-center p-4 gap-4'>
            <h2 className='text-2xl font-bold text-center'>How does this work?</h2>
          </div>
        </section>
      </main> */}

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