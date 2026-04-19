import { useNavigate } from "react-router-dom";
import "./ChallengePage.css";
import { useState, useEffect } from 'react';
import rat from "../../assets/rat.gif";
import upload from "../../assets/upload.jpg"

function ChallengePage() {
  const navigate = useNavigate();
  const [ challenge, setChallenge ] = useState({ title: 'Loading your challenge...', id: null, completed: false });

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

  // --- UI RENDERING ---
  return (
    // 1. A master wrapper for the whole page (gives it a nice default background)
    <div className="w-full bg-base-100">

      {/* =========================================
          SECTION 1: THE CHALLENGE CONTENT
          ========================================= */}
      {/* pt-16 pushes it down from the top, pb-20 gives it breathing room before the hero */}
      <div className="flex flex-col items-center pt-16 pb-20 px-4 text-center">



        <h1 className="mb-4 text-4xl font-bold">Today's Challenge</h1>
            <p className="mb-8 text-2xl text-primary font-semibold">

            {challenge.title}
            </p>

        <div className="flex justify-center gap-4 w-full">
          <button className="btn btn-outline" onClick={reroll_challenge}>
              Reroll
          </button>

        </div>
      </div>

      {/* =========================================
          SECTION 2: THE HERO BANNER
          ========================================= */}
      {/* Notice min-h-screen is changed to min-h-[50vh] so it acts like a banner! */}
      <div
        className="hero min-h-[75vh]"
        style={{
          backgroundImage: `url(${upload})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>

        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">Ready to upload?</h1>
            <p className="mb-5">
              Get started for the day!
              Upload your completed challenge here
            </p>
            <button className="btn btn-accent" onClick={() => navigate("/log-challenge")}>Upload Challenge</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ChallengePage;