import { useNavigate } from "react-router-dom";
import "./ChallengePage.css";
import { useState, useEffect } from 'react';

function ChallengePage() {
  const navigate = useNavigate();
  const [ challenge, setChallenge ] = useState('Loading your challenge...');

  const fetchChallenge = async () => {
      const token = localStorage.getItem('token');
      fetch('http://127.0.0.1:8000/users/api/random-challenge/', {
          method: 'GET', headers: { 'Content-Type': 'application/json',
              Authorization: `Token ${token}`}
          })
      .then(response => response.json())
      .then(data => setChallenge(data.daily_challenge))
      .catch(error => console.error("Error fetching data:", error))
  }
  const reroll_challenge = async () => {
      const token = localStorage.getItem('token');
      fetch('http://127.0.0.1:8000/users/api/reroll/', {
          method: 'GET', headers: { 'Content-Type': 'application/json',
          Authorization: `Token ${token}`}})
      .then(response => response.json())
      .then(data => {setChallenge(data.daily_challenge)})
      .catch (error => console.error("Error fetching data:", error))
  }
  useEffect(() => {
      fetchChallenge()
  }, [])
    const saveChallenge = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/users/api/log-challenge/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            Authorization: `Token ${token}`},
            body: JSON.stringify({
                challenge_title: challenge,
            })
        })

    }

  return (
    <div className = "challenge-container">
      <h1>Today's Challenge</h1>
        <h2 className = "daily-challenge">{challenge}</h2>
        <button onClick={fetchChallenge}>Reroll Daily Challenge</button>

        <button onClick={saveChallenge}>Save</button>

        <button onClick={()=>navigate("/log-challenge")}>
            Log Challenge
        </button>

        <button onClick={() => navigate("/home")}>
        Home
        </button>
    </div>
  );
}

export default ChallengePage;