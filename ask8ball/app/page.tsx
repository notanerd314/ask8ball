import '../styles/globals.css'
import Magic8Ball from '../components/Magic8Ball'
import BottomButtons from '../components/BottomButtons'
import { GlobalProvider } from '../components/common/GlobalContext'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <div className='eightBallMain'>
          <Magic8Ball />
          <BottomButtons />
        </div>
      </GlobalProvider>
    </>
  )
}
