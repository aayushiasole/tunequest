// src/utils/getToken.js
export async function exchangeCodeForToken(code) {
  const verifier = localStorage.getItem('pkce_verifier');

  const body = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    code_verifier: verifier,
  });

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    throw new Error(`Token request failed: ${res.status}`);
  }

  const data = await res.json();
  // Save token for later API calls
  localStorage.setItem('spotify_access_token', data.access_token);
  // Optional: store refresh_token if you want to refresh later
  if (data.refresh_token) localStorage.setItem('spotify_refresh_token', data.refresh_token);
  return data.access_token;
}
