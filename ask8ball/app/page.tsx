import '../styles/globals.css'
import Magic8Ball from '../components/Magic8Ball'
import BottomButtons from '../components/BottomButtons'
import { GlobalProvider } from '../components/GlobalContext'

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <Magic8Ball />
        <BottomButtons />
      </GlobalProvider>
    </>
  )
}
