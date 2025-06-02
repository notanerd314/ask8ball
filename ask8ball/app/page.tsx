import '../styles/globals.css'
import Magic8Ball from '../components/eightball/Magic8Ball'
import Magic8BallQuestion from '../components/eightball/Magic8BallQuestion'
import BottomButtons from '../components/BottomButtons'
import CustomizationSidebar from '../components/CustomizationSidebar'
import { GlobalProvider } from '../components/common/GlobalContext'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <div className='main'>
          <Magic8Ball />
          <CustomizationSidebar />
        </div>
      </GlobalProvider>
    </>
  )
}
