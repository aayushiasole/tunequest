// src/utils/getToken.js
export async function exchangeCodeForToken(code) {
  const res = await fetch('https://<your-backend-project>.vercel.app/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });

  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status}`);
  }

  const data = await res.json();

  // Save access token
  localStorage.setItem('spotify_access_token', data.access_token);
  // Optional: store refresh token
  if (data.refresh_token) {
    localStorage.setItem('spotify_refresh_token', data.refresh_token);
  }

  return data.access_token;
}
