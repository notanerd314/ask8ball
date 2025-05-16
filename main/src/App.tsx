import Magic8Ball from './components/Magic8Ball'
import { GlobalProvider } from './components/GlobalContext'

function App() {
    return (
        <GlobalProvider>
            <Magic8Ball />
        </GlobalProvider>
    )
}

export default App