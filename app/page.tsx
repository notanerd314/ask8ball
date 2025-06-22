import Magic8Ball from '../components/eightball/Magic8Ball'
import UserReview from '../components/common/UserReviews'
import Collapsible from '../components/common/Collapsible'

import { EightBallProvider } from '../components/context/EightBallContext'

import { ToastContainer, Slide } from 'react-toastify'
import PersonalitySwitcher from '../components/eightball/PersonalitySwitcher'


function QASection() {
  return (
    <section className='mb-7'>
      <h1 className='text-5xl font-bold text-center'>Frequently Asked Questions</h1>
      <div className='flex flex-col items-center gap-2.5 p-5'>
        <Collapsible title='What is the Magic 8 Ball?' className="w-5xl">
          <p>The Magic 8 Ball is a plastic sphere, made to look like an oversized eight ball, that is used for fortune-telling or seeking advice. It was invented in 1946 by Albert C. Carter and Abe Bookman and is manufactured by Mattel.[1] The user asks a yes–no question to the ball, then turns it over to reveal an answer that floats up into a window.</p>
          <br /><a href="https://en.wikipedia.org/wiki/Magic_8-Ball">Wikipedia</a>
        </Collapsible>
        <Collapsible title='What does this website do?' className="w-5xl">
          <p>It enhances the Magic 8 Ball by adding AI functionality to it, making it smarter.</p>
        </Collapsible>
        <Collapsible title='Is it paid?' className="w-5xl">
          <p>No! It's <span className='font-bold bg-linear-90 from-purple-500 from-0% to-violet-500 to-100% bg-clip-text text-transparent'>completely</span> free. Except the addition of ads.</p>
        </Collapsible>
        <Collapsible title='Why did you make this?' className="w-5xl">
          <p>I'm bored.</p>
        </Collapsible>
        <Collapsible title='Do you eat soap?' className="w-5xl">
          <p>Yes, obviously I do.</p>
        </Collapsible>
      </div>
    </section>
  )
}

function UserReviewsSection() {
  return (
    <section className='mb-7'>
      <h1 className='text-5xl font-bold text-center'>What Our <span className='text-xl font-normal text-gray-500'>(My)</span> Users Say</h1>
      <div className='flex flex-wrap justify-center gap-4 p-5'>
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
          quote="It's actually better than my friends' decisions."
          author="Sarah Smith"
          stars={4}
        />
      </div>
    </section>
  )
}

function TopBar() {
  return (
    <div className='fixed flex backdrop-blur-md bg-white/30 dark:bg-black/30 p-3.5 left-2.5 right-2.5 top-2.5 rounded-md gap-1.5 items-center border-2 border-white/10 text-[1.25rem] z-50'>
      <img src="/favicon.min.svg" alt="Logo" width={30} height={30}></img>
      <p className='font-bold'>ask8ball</p>
      <div className='h-5 mx-1 border-l-2 border-white/10' />
      <a href="/about">about</a>
    </div>
  )
}

function Footer() {
  return (
    <div className='flex flex-col items-center gap-2.5 p-5 bg-black/60 backdrop-blur-2xl'>
      <p className='text-sm text-center'>2025 ask8ball. Some rights reserved.</p>
    </div>
  )
}

export default function Page() {
  return (
    <>
      <TopBar />
      
      <div className='fixed h-screen w-screen bg-linear-150 from-gray-950 from-40% to-purple-500 to-100% -z-50'>

      </div>

      <EightBallProvider>
        <div className="flex flex-col items-center w-full h-screen overflow-hidden gap-0 pb-1.5 pt-30">
          <PersonalitySwitcher personalities={['Sarcastic', 'Classic']} />
          <Magic8Ball />
          <p className='text-sm text-center text-gray-400'>
            The responses are AI-generated for entertainment purposes only. Do not take this seriously.
          </p>
        </div>
      </EightBallProvider>

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