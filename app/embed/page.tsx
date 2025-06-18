import '../../styles/globals.css'
import Magic8BallEmbed from '../../ask8ball/components/eightball/Magic8BallEmbed'
import { GlobalProvider } from '../../ask8ball/components/context/GlobalContext';

export default function Page() {
  return (
    <>
      <GlobalProvider>
        <Magic8BallEmbed />
      </GlobalProvider>
    </>
  );
}