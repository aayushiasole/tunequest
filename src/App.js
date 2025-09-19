import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import TopTracks from './pages/TopTracks';
import AlbumFinder from './pages/AlbumFinder';
import About from './pages/About';

import { exchangeCodeForToken } from './utils/getToken';

function App() {
  // Hold the access token in state and also persist it in localStorage
  const [token, setToken] = useState(
    localStorage.getItem('spotify_access_token') || null
  );

  useEffect(() => {
    // Look for ?code=... in the URL after Spotify redirects back
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && !token) {
      // Exchange the code for an access token using our PKCE verifier
      exchangeCodeForToken(code)
        .then((accessToken) => {
          setToken(accessToken);
          // Remove the code parameter from the URL so it looks clean
          window.history.replaceState({}, document.title, '/');
        })
        .catch((err) => console.error('Token exchange error:', err));
    }
  }, [token]);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Pass the token as a prop so these pages can call the Spotify API */}
        <Route path="/top-tracks" element={<TopTracks token={token} />} />
        <Route path="/album-finder" element={<AlbumFinder token={token} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
