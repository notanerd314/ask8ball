import { ImageResponse } from 'next/og';
import { getPersonalityData } from '../../../../lib/api';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

/** 
 * Generates shareable image for eight ball results
 * @param request - HTTP request with query parameters for image generation
 * @returns Promise resolving to ImageResponse with generated image
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const personality = searchParams.get('personality');
  if (!personality) return new Response('No personality provided', { status: 400 });

  const personalityData = await getPersonalityData(personality);
  if (!personalityData) return new Response('Personality not found', { status: 404 });

  const requiredCharacters = Array.from(
    new Set(personalityData.name + personalityData.description)
  );

  function calculateFontSize(text: string): number {
    return Math.max(17, (text.length < 6 ? 50 : text.length < 20 ? 37 : text.length < 40 ? 27 : text.length < 60 ? 20 : 17) * 0.75);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'DM Sans',
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
          padding: '50px',
          color: 'white',
          background: personalityData?.theme.cssBackground,
        }}
      >
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifySelf: 'center',
          paddingTop: '70px',
        }}>
          <span style={{ fontSize: '125px', margin: 0 }}>
            {personalityData?.theme.icon}
          </span>
          <h1 style={{ fontSize: '60px', margin: 0, fontWeight: 700 }}>
            {personalityData?.name}
          </h1>
          <p style={{ maxWidth: '550px', fontSize: '30px', margin: 0 }}>
            {personalityData?.description}
          </p>
        </div>

        <div
          style={{
            flex: 0.9,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            borderRadius: '100%',
            border: '12px solid rgba(255, 255, 255, 0.5)',
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
                fontSize: calculateFontSize(personalityData?.examples[0].response),
                color: 'white',
              }}
            >
              {personalityData?.examples[0].response}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
      fonts: [
        {
          name: 'DM Sans',
          data: await loadGoogleFont('DM+Sans', requiredCharacters.join('')),
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
