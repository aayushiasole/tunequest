import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import TopTracks from './pages/TopTracks';
import AlbumFinder from './pages/AlbumFinder';
import About from './pages/About';

/* ----------- Spotify Implicit Grant ----------- */
const clientId    = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scopes      = process.env.REACT_APP_SCOPES;

export const loginUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URI)}` +
  `&scope=user-top-read` +
  `&response_type=token` +        // 👈 MUST be token
  `&show_dialog=true`;


 

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('spotify_access_token') || null
  );

useEffect(() => {
  if (!token) {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const _token = params.get("access_token");
      if (_token) {
        localStorage.setItem("spotify_access_token", _token);
        setToken(_token);
        // clean the URL so the #access_token part disappears
        window.history.replaceState({}, document.title, "/");
      }
    } else {
      const saved = localStorage.getItem("spotify_access_token");
      if (saved) setToken(saved);
    }
  }
}, [token]);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home loginUrl={loginUrl} />} />
        <Route path="/top-tracks" element={<TopTracks token={token} />} />
        <Route path="/album-finder" element={<AlbumFinder token={token} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
