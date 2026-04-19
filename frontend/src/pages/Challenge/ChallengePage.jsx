import { useNavigate } from "react-router-dom";
import "./ChallengePage.css";
import { useState, useEffect } from 'react';
import rat from "../../assets/rat.gif";
import upload from "../../assets/upload.jpg"

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
           {challenge}
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