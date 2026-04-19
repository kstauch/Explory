import { useNavigate } from "react-router-dom";
import "./ChallengePage.css";
import { useState, useEffect } from 'react';

function ChallengePage() {
  const navigate = useNavigate();
  const [ challenge, setChallenge ] = useState('Loading your challenge...');

  const fetchChallenge = async () => {
      const token = localStorage.getItem('token');
      const challengeRes = await fetch('http://127.0.0.1:8000/users/api/random-challenge/',{
          headers: {Authorization: `Token ${token}`}
      });
      const challengeData = await challengeRes.json();
      const todayRes = await fetch('http://127.0.0.1:8000/challenges/api/todays-challenge/',{
          headers: {Authorization: `Token ${token}`}
      });
      const todayData = await todayRes.json();
      const todayChallenge = todayData.challengeslist?.[0];
      setChallenge({title: challengeData.daily_challenge,
      id: todayChallenge?.id ?? null, completed: todayChallenge?.completed ?? false});
    }

  const reroll_challenge = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      try{
              const res = await fetch('http://127.0.0.1:8000/users/api/reroll/', {
                  method: 'GET', headers: { 'Content-Type': 'application/json',
                  Authorization: `Token ${token}`}})
          console.log("reroll", res.status);
          const data = await res.json();
          console.log("data");
          setChallenge(prev=>({...prev, title: data.daily_challenge}));
      }
      catch(err){
          console.log(err);
      }
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
                challenge_title: challenge?.title,
            })
        })

    }
    const isCompleted = challenge?.completed;
  return (
    <div className = "challenge-container">
      <h1>Today's Challenge</h1>
        <h2 className = "daily-challenge">{challenge?.title ?? 'Loading challenge...'}</h2>
        {!isCompleted && (
            <>
                <button onClick={reroll_challenge}>Reroll Daily Challenge</button>

                <button onClick={saveChallenge}>Save</button>

                <button onClick={()=>navigate("/log-challenge")}>
                    Log Challenge
                </button>
            </>
        )}
        {isCompleted && (
            <p>You have already completed today's challenge!</p>
        )}

        <button onClick={() => navigate("/home")}>
        Home
        </button>
    </div>
  );
}

export default ChallengePage;