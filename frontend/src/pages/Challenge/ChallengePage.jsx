import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import upload from "../../assets/upload.jpg";

function ChallengePage() {
  const navigate = useNavigate(); //allows for us to reuse logic to go to other pages
  const [challenge, setChallenge] = useState({ //lets us send challenges to be saved
    title: 'Loading your challenge...', //in the backend and has what is written as the default when nothing
    description: '', //is there
    id: null,
    completed: false
  });

 const [hasRolled, setHasRolled] = useState(false);
 const [isPicked, setIsPicked] = useState(false);

  const fetchChallenge = async () => {
    const token = localStorage.getItem('token');
    try {
      const challengeRes = await fetch('http://127.0.0.1:8000/users/api/random-challenge/', {
        headers: { Authorization: `Token ${token}` }
      });
      const challengeData = await challengeRes.json();
      if (!challengeRes.ok || !challengeData.daily_challenge) return;

      const todayRes = await fetch('http://127.0.0.1:8000/challenges/api/todays-challenge/', {
        headers: { Authorization: `Token ${token}` }
      });
      const todayData = await todayRes.json();
      const todayChallenge = todayData.challengeslist?.[0];

      const newChallenge = {
        title: challengeData.daily_challenge,
        description: challengeData.description,
        id: todayChallenge?.id ?? null,
        completed: todayChallenge?.completed ?? false
      };

      setChallenge(newChallenge);
      localStorage.setItem('rolled_challenge_title', challengeData.daily_challenge);
      localStorage.setItem('rolled_challenge_id', todayChallenge?.id ?? '');
      setHasRolled(true);
      document.getElementById('challenge_modal').showModal();
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
      if (!res.ok || !data.daily_challenge) return;

      setChallenge(prev => ({
        ...prev,
        title: data.daily_challenge,
        description: data.description
      }));
      localStorage.setItem('rolled_challenge_title', data.daily_challenge);
    } catch (err) {
      console.error("Error rerolling challenge:", err);
    }
  };

useEffect(() => {
    const savedTitle = localStorage.getItem('rolled_challenge_title');
    const savedId = localStorage.getItem('rolled_challenge_id');
    if (savedTitle) {
      setChallenge(prev => ({ ...prev, title: savedTitle, id: savedId }));
      setHasRolled(true);
    }

    const checkCompletion = async () => {
      const token = localStorage.getItem('token');
      try {
        const todayRes = await fetch('http://127.0.0.1:8000/challenges/api/todays-challenge/', {
          headers: { Authorization: `Token ${token}` }
        });
        const todayData = await todayRes.json();
        const todayChallenge = todayData.challengeslist?.[0];
        if (todayChallenge?.completed) {
          setChallenge(prev => ({
            ...prev,
            completed: true,
            title: todayChallenge.title,
            description: todayChallenge.description
          }));
          setHasRolled(true);
        }
      } catch (err) {
        console.error("Error checking completion:", err);
      }
    };
    checkCompletion();
  }, []);

return (
    <div className="w-full bg-base-100">
      <div className="flex flex-col items-center pt-16 pb-20 px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold">Today's Challenge</h1>

        {challenge.completed ? (
          <>
            <p className="text-lg text-primary font-semibold mb-4">Challenge completed for the day. Come back tomorrow!</p>
            <p className="text-5xl font-bold text-secondary mb-2">{challenge.title}</p>
            <p className="text-base opacity-70">{challenge.description}</p>
            
          </>
        ) : (
            <>
              <div className="flex justify-center gap-4 w-full mb-6">
                <button
                  className="btn btn-accent btn-xs"
                  onClick={hasRolled ? () => document.getElementById('challenge_modal').showModal() : fetchChallenge}
                >
                  Roll My Challenge
                </button>
              </div>
              {isPicked && challenge.title && (
                <div>
                  <p className="text-5xl font-bold text-secondary mb-2">{challenge.title}</p>
                  <p className="text-base opacity-70">{challenge.description}</p>
                </div>
              )}
            </>
        )}
      </div>

      {/* Challenge Modal */}
      <dialog id="challenge_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-2">{challenge.title}</h3>
          <p className="text-base opacity-70">{challenge.description || 'Description not available'}</p>
          <div className="modal-action">
            <button className="btn btn-outline" onClick={reroll_challenge}>Reroll</button>
            <form method="dialog">
              <button className="btn btn-primary" onClick={() => setIsPicked(true)}>Pick Challenge</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="hero min-h-[75vh]" style={{ backgroundImage: `url(${upload})` }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold">Ready to upload?</h1>
            <p className="mb-5">Get started for the day! Upload your completed challenge here</p>
            <button className="btn btn-accent" onClick={() => {
              if (challenge.completed) {
                document.getElementById('completed_modal').showModal();
              } else {
                navigate("/log-challenge");
              }
            }}>Upload Challenge</button>
          </div>
        </div>
      </div>

      {/* Challenge Completed Modal */}
      <dialog id="completed_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-2">Challenge Completed!</h3>
          <p className="text-base opacity-70">Challenge completed for the day. Come back tomorrow!</p>
          <div className="modal-action">
            <form method="dialog"><button className="btn">Close</button></form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ChallengePage;