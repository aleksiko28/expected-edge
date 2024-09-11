// src/routes/api/proxy/+server.js
export async function GET() {
  const apiUrl = "https://fantasy.premierleague.com/api/fixtures/" // External API URL
  const response = await fetch(apiUrl)
  const data = await response.json()

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
