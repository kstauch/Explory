import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import upload from "../../assets/upload.jpg";

function ChallengePage() {
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState({
    title: 'Loading your challenge...',
    description: '',
    id: null,
    completed: false
  });

  const fetchChallenge = async () => {
    const token = localStorage.getItem('token');
    try {
      const challengeRes = await fetch('http://127.0.0.1:8000/users/api/random-challenge/', {
        headers: { Authorization: `Token ${token}` }
      });
      const challengeData = await challengeRes.json();

      if (!challengeRes.ok || !challengeData.daily_challenge) {
        console.error("Failed to fetch random challenge:", challengeData);
        setChallenge({ title: "Error loading challenge", description: '', id: null, completed: false });
        return;
      }

      const todayRes = await fetch('http://127.0.0.1:8000/challenges/api/todays-challenge/', {
        headers: { Authorization: `Token ${token}` }
      });
      const todayData = await todayRes.json();
      const todayChallenge = todayData.challengeslist?.[0];

      setChallenge({
        title: challengeData.daily_challenge,
        description: challengeData.description,
        id: todayChallenge?.id ?? null,
        completed: todayChallenge?.completed ?? false
      });
    } catch (err) {
      console.error("Error fetching challenge:", err);
    }
  };

  const reroll_challenge = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://127.0.0.1:8000/users/api/reroll/', {
        method: 'GET',
        headers: { Authorization: `Token ${token}` }
      });
      const data = await res.json();

      if (!res.ok || !data.daily_challenge) {
        console.error("Failed to reroll challenge:", data);
        return;
      }
      setChallenge(prev => ({
        ...prev,
        title: data.daily_challenge,
        description: data.description
      }));
    } catch (err) {
      console.error("Error rerolling challenge:", err);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  const saveChallenge = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://127.0.0.1:8000/users/api/log-challenge/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          challenge_title: challenge?.title
        })
      });
    } catch (err) {
      console.error("Error saving challenge:", err);
    }
  };

  return (
    <div className="w-full bg-base-100">
      <div className="flex flex-col items-center pt-16 pb-20 px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Today's Challenge</h1>
        <p className="mb-8 text-2xl text-secondary font-semibold">{challenge.title}</p>
        <p className="mb-2 text-lg">{challenge.description || 'Description not available'}</p>
        <div className="flex justify-center gap-4 w-full">
          <button className="btn btn-outline" onClick={reroll_challenge}>Reroll</button>
        </div>
      </div>
      <div className="hero min-h-[75vh]" style={{ backgroundImage: `url(${upload})` }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">Ready to upload?</h1>
            <p className="mb-5">Get started for the day! Upload your completed challenge here</p>
            <button className="btn btn-accent" onClick={() => navigate("/log-challenge")}>Upload Challenge</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChallengePage;