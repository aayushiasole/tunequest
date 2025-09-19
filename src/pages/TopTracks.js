import { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import '../receipt.css';


export default function TopTracks({ token }) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    async function fetchTopTracks() {
      try {
        const res = await fetch(
          'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!res.ok) {
          throw new Error(`Spotify API error: ${res.status}`);
        }
        const data = await res.json();
        setTracks(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopTracks();
  }, [token]);

  if (!token) {
    return <Alert variant="warning">Please log in with Spotify first.</Alert>;
  }
  if (loading) return <Spinner animation="border" className="m-4" />;
  if (error)   return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4" style={{maxWidth:'400px'}}>
      <div className="p-3 border rounded bg-light receipt">
        <h4 className="text-center mb-3">🎵 TuneQuest Receipt</h4>
        <hr />
        {tracks.map((track, idx) => (
          <div key={track.id} className="d-flex justify-content-between">
            <span>{idx + 1}. {track.name}</span>
            <span>{track.artists.map(a => a.name).join(', ')}</span>
          </div>
        ))}
        <hr />
        <p className="text-center">Thank you for listening!</p>
      </div>
    </Container>
  );
}
