// src/routes/api/proxy/+server.js
export async function GET({ url }) {
  const apiUrl = url // External API URL
  const response = await fetch(apiUrl)
  const data = await response.json()

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  })
}
