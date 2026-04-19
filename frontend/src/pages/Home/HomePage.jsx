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
  const [streak, setStreak] = useState("0");
  const [points, setPoints] = useState("0");

  useEffect(() => {
      const storedStreak = localStorage.getItem("streak_count");
      if (storedStreak) {
          setStreak(storedStreak);
      }
  },[])

    useEffect(() => {
        const points = localStorage.getItem("total_points");
        if (points) {
            setPoints(points);
        }
    }, [])
  return (
    <div>
      <h1>Explory</h1>
      <h2>Welcome, {username}!</h2>
        <h3>Streak: {streak}</h3>
        <h3>Points: {points}</h3>

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