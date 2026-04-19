import { useNavigate } from "react-router-dom";


function LeaderboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Friend's Leaderboard</h1>

      <button onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
}

export default LeaderboardPage;