import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Explory</h1>

      <button onClick={() => navigate("/challenge")}>
        Today's Challenge
      </button>

      <button onClick={() => navigate("/explory")}>
        My Explory
      </button>

      <button onClick={() => navigate("/profile")}>
        Profile
      </button>

      <button onClick={() => navigate("/leaderboard")}>
        Leaderboard
      </button>
    </div>
  );
}

export default HomePage;