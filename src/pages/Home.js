export default function Home({ loginUrl }) {
  return (
    <div className="text-center p-5 bg-dark text-light min-vh-100">
      <h1 className="mb-4">Welcome to TuneQuest</h1>
      <p>Your music journey starts here. Explore your top tracks and discover new albums.</p>

      <a
        href={loginUrl}
        className="btn btn-success btn-lg mt-4"
      >
        Login with Spotify
      </a>
    </div>
  );
}
