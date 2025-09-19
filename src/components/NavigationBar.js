import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { loginWithSpotify } from '../utils/spotifyAuth';

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Placeholder for your future logo */}
        <Navbar.Brand as={Link} to="/">TuneQuest</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/top-tracks">Top Tracks</Nav.Link>
            <Nav.Link as={Link} to="/album-finder">Album Finder</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Button variant="success" onClick={loginWithSpotify}>Login with Spotify</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
