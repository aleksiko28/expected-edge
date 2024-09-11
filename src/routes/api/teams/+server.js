import { formatTeamData } from "./team-utils"

// src/routes/api/proxy/+server.js
export async function GET() {
  const apiUrl = "https://fantasy.premierleague.com/api/bootstrap-static/" // External API URL
  const response = await fetch(apiUrl)
  const data = await response.json()

  const formattedData = formatTeamData(data.teams)

  return new Response(JSON.stringify(formattedData), {
    headers: { "Content-Type": "application/json" },
  })
}
