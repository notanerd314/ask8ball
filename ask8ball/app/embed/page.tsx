import '../../styles/globals.css'
import Magic8BallEmbed from '../../components/eightball/Magic8BallEmbed'
import { GlobalProvider } from '../../components/context/GlobalContext';

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <Magic8BallEmbed />
      </GlobalProvider>
    </>
  );
}