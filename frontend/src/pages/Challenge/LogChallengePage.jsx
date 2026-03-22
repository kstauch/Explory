import { useNavigate } from "react-router-dom";
import "./LogChallengePage.css";

function LogChallengePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Log Today's Challenge</h1>

      <button onClick={() => navigate("/challenge")}>
        Today's Challenge
      </button>
    </div>
  );
}

export default LogChallengePage;