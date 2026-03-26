import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect, useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <h1>Explory</h1>
      <h2>Welcome, {username}!</h2>

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
      <hr/>

      <footer>
        <button onClick={() => navigate("/")}>
        Exit Explory
      </button></footer>
      


    </div>
  );
}

export default HomePage;