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
  `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(process.env.REACT_APP_SCOPES)}` +
  `&response_type=token&show_dialog=true`;


function App() {
  const [token, setToken] = useState(
    localStorage.getItem('spotify_access_token') || null
  );

useEffect(() => {
  if (!token) {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      if (access_token) {
        localStorage.setItem("spotify_access_token", access_token);
        setToken(access_token);
        // clean the URL so it looks nice
        window.history.replaceState({}, document.title, "/");
      }
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
