import { ImageResponse } from 'next/og';
import { signParams } from '../../../../lib/cryptography';
import { getPersonalityData } from '../../../../lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const response = searchParams.get('response');
  const question = searchParams.get('question');
  const personality = searchParams.get('personality');
  const sig = searchParams.get('sig');

  if (!response) return new Response('No response provided', { status: 400 });
  if (!question) return new Response('No question provided', { status: 400 });
  if (!personality) return new Response('No personality provided', { status: 400 });
  if (!sig) return new Response('Signature not provided', { status: 400 });

  if (sig !== signParams([question, response, personality], process.env.IMAGE_SECRET || '')) {
    return new Response('Invalid signature', { status: 403 });
  }

  /** Calculates optimal font size based on text length */
  function calculateFontSize(text: string): number {
    if (text.length < 6) return 50;
    if (text.length < 20) return 37;
    if (text.length < 40) return 27;
    if (text.length < 60) return 20;
    if (text.length < 80) return 17;
    return 17;
  }

  const personalityData = await getPersonalityData(personality);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '900px',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          background: personalityData?.theme.cssBackground,
        }}
      >
        {/* Top banner text */}
        <div style={{
          display: 'flex',
          padding: '15px',
          paddingBottom: '0px',
        }}>
          <div
            style={{
              width: '100%',
              height: '135px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',

              color: 'white',
              fontSize: 42,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {question}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '50px',
            backgroundColor: 'transparent'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="348 234 440 440"
            width="100%"
            height="100%"
          >
            <defs>
              <linearGradient id="innerDiceBackgroundGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#282828" />
                <stop offset="50%" stopColor="#0F0F0F" />
              </linearGradient>
              <linearGradient id="borderGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="35%" stopColor="#282828" />
              </linearGradient>
              <radialGradient id="bgGrad" cx="10%" cy="10%" r="70%">
                <stop offset="0%" stopColor="rgb(59, 59, 59)" />
                <stop offset="50%" stopColor="rgba(0, 0, 0, 1)" />
                <stop offset="100%" stopColor="#000" />
              </radialGradient>
            </defs>

            <ellipse cx="568" cy="454" fill="url(#bgGrad)" rx="220" ry="220" />
            <ellipse cx="568" cy="454" fill="url(#borderGrad)" rx="115" ry="113" />
            <path
              fill="url(#innerDiceBackgroundGrad)"
              stroke="transparent"
              d="M678 454.4c1.4-58.6-48.9-107-109.8-105.5-61-1.4-111.2 47-109.7 105.5-1.5 58.5 48.8 106.9 109.7 105.5 61 1.4 111.2-46.7 109.7-105.5z"
            />
            <path
              fill={personalityData?.theme.accentColor}
              stroke="transparent"
              d="M481.3 402.7c-3.1-5.7.3-10.4 8.2-10.7 50.6-1.6 107.6-1.6 157.4.3 7.6.2 11 5.2 7.9 10.6a2332.4 2332.4 0 0 1-80 131.1c-3.6 5.7-9.6 5.7-13.3 0a2645.3 2645.3 0 0 1-80.1-131.3z"
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              width: '30%',
              height: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              padding: '10px',
            }}
          >
            <p
              style={{
                fontSize: calculateFontSize(response),
                color: 'white',
              }}
            >
              {response}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 750,
      height: 900,
      emoji: 'twemoji',
    },
  );
}
