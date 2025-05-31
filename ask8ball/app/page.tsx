import '../styles/globals.css'
import Magic8Ball from '../components/eightball/Magic8Ball'
import Magic8BallQuestion from '../components/eightball/Magic8BallQuestion'
import BottomButtons from '../components/BottomButtons'
import Customization from '../components/dialog/CustomizeDialog'
import { GlobalProvider } from '../components/common/GlobalContext'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <div className='eightBallMain'>
          <Magic8Ball />
          <Magic8BallQuestion />
          <BottomButtons />
        </div>
        {/* <Customization /> */}
      </GlobalProvider>
      <main>
        <h1>gay</h1>
      </main>
    </>
  )
}
