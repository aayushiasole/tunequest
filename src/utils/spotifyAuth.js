import { generateRandomString, sha256 } from './pkce';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scopes = process.env.REACT_APP_SCOPES;

export async function loginWithSpotify() {
  const verifier = generateRandomString(128);
  const challenge = await sha256(verifier);

  localStorage.setItem('pkce_verifier', verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopes,
    code_challenge_method: 'S256',
    code_challenge: challenge,
  });
console.log("Redirecting to Spotify with redirect_uri:", redirectUri);
  window.location = `https://accounts.spotify.com/authorize?${params}`;
}
