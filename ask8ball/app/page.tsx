import '../styles/globals.css'
import Magic8Ball from '../components/eightball/Magic8Ball'
import BottomButtons from '../components/layout/BottomButtons'
import CustomizationSidebar from '../components/layout/CustomizationSidebar'
import { GlobalProvider } from '../components/context/GlobalContext'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <div className='main'>
          <Magic8Ball />
          <CustomizationSidebar />
        </div>
        <h1>ijrajeiowdfjeioawdjioawdijoqawdjioawjiodajiowdaijopwdijoawdijoawjiodaijowdioajwdjioawdijo</h1>
      </GlobalProvider>
    </>
  )
}