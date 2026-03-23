import { useNavigate } from "react-router-dom";
import "./ChallengePage.css";

function ChallengePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Today's Challenge</h1>

      <button onClick={() => navigate("/log-challenge")}>
        Log Challenge
      </button>

      <button onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}

export default ChallengePage;