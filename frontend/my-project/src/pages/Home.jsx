import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome! Start Your Note-Taking Journey. 📝</h1>
        <p>Your notes are waiting — login or register to continue.</p>

        <div className="home-buttons">
          <Link to="/login">
            <button className="btn-login">Login</button>
          </Link>

          <Link to="/register">
            <button className="btn-register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
