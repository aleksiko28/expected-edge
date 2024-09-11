import { formatPlayerData } from "./player-utils"

// src/routes/api/proxy/+server.js
export async function GET() {
  const apiUrl = "https://fantasy.premierleague.com/api/bootstrap-static/" // External API URL
  const response = await fetch(apiUrl)
  const data = await response.json()

  const formattedData = formatPlayerData(data.elements)

  return new Response(JSON.stringify(formattedData), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
