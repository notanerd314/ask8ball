import '../styles/globals.css'
import Magic8Ball from '../components/Magic8Ball'
import BottomButtons from '../components/BottomButtons'
import { GlobalProvider } from '../components/GlobalContext'
import { Magic8BallRef } from '../components/Magic8BallRef'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <Magic8BallRef>
          <div className='eightBallMain'>
            <Magic8Ball />
            <BottomButtons />
          </div>
        </Magic8BallRef>
      </GlobalProvider>
    </>
  )
}
