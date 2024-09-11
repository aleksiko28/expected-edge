// src/routes/api/proxy/+server.js
export async function GET({ url }) {
	const id = url.searchParams.get('id'); // Get the ID from the URL
	let photoBaseUrl = 'https://resources.premierleague.com/premierleague/badges/';
	const apiUrl = photoBaseUrl + id; // External API URL
	const response = await fetch(apiUrl);

	const contentType = response.headers.get('Content-Type'); // Get the image's content type (e.g., image/jpeg, image/png)
	const imageBuffer = await response.arrayBuffer(); // Get the image as a binary buffer

	return new Response(imageBuffer, {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		headers: {
			'Content-Type': contentType, // Set the correct content type so the browser knows it's an image
			'Cache-Control': 'public, max-age=3600' // Optional: Cache the image for performance
		}
	});
}
