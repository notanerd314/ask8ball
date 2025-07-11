import { ImageResponse } from 'next/og';
import { getPersonalityData } from '../../../lib/api';

export const runtime = 'edge';

/**
 * Generates Open Graph images for social sharing
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const personality = searchParams.get('personality');

  let personalityData = null;
  if (personality) {
    personalityData = await getPersonalityData(personality);
  }

  const title = personalityData 
    ? `${personalityData.name} Magic 8 Ball`
    : 'Ask the 8 Ball';
    
  const description = personalityData?.description || 
    'AI-powered Magic 8 Ball with multiple personalities';

  const background = personalityData?.theme.cssBackground || 
    'linear-gradient(to bottom right, #5A1181, #1E3A8A, #3730A3)';

  const icon = personalityData?.theme.icon || '🎱';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: '120px',
              marginBottom: '20px',
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              margin: '0 0 20px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '32px',
              margin: '0 0 40px 0',
              maxWidth: '800px',
              lineHeight: 1.4,
              opacity: 0.9,
            }}
          >
            {description}
          </p>

          {/* Call to action */}
          <div
            style={{
              fontSize: '24px',
              padding: '16px 32px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Ask a question and get mystical answers!
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '20px',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          ask8ball.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}