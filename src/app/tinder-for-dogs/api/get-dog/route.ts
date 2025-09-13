export async function GET() {
  const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=1', {
    headers: {
      'x-api-key': process.env.DOG_API_KEY!
    }
  });

  if (!response.ok) {
    return new Response('Failed to fetch dog image', { status: 500 });
  }

  const data = await response.json();

  // Return JSON to the client
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
