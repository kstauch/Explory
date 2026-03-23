import { useNavigate } from "react-router-dom";
import "./LeaderboardPage.css";

function LeaderboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Friend's Leaderboard</h1>

      <button onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}

export default LeaderboardPage;