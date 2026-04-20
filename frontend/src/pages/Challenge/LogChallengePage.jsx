import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";

function LogChallengePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const imageUpload = async (selectedFile) => {
      if (!selectedFile) return;
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      const formData = new FormData();
      formData.append('challengeimage', selectedFile);
      const token = localStorage.getItem('token');
      try {
          const response = await fetch('http://localhost:8000/users/api/upload-challenge/', {
        method: 'POST',
        headers: { authorization: `Token ${token}` },
        body: formData
      });
      const data = await response.json();
      console.log("Initial Image Upload Data:", data);
    } catch (err) {
      console.error("Error uploading initial image:", err);
    }
  };


  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    imageUpload(droppedFile);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    imageUpload(selectedFile);
  }
  const [todaysChallenge, setTodaysChallenge] = useState({ title: "", id: null });
  useEffect(() => {
      const fetchChallengeData = async () => {
          const token = localStorage.getItem('token');
          try {
              const challengeRes = await fetch('http://localhost:8000/users/api/random-challenge/', {
                  headers: { Authorization: `Token ${token}`}
                  });
              const challengeData = await challengeRes.json();
              const todayRes = await fetch('http://localhost:8000/challenges/api/todays-challenge/', {
                  headers: { Authorization: `Token ${token}` }
                  });
              const todayData = await todayRes.json();
              const challengeId = todayData.challengeslist?.[0]?.id;
              setTodaysChallenge({
                  title: challengeData.daily_challenge,
                  id: challengeId
                  });
              } catch (err) {
                  console.error("Error fetching challenge data:", err);
              }
          };
      fetchChallengeData();

  }, []);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const handleSubmit = async () => {
        const challengeId = todaysChallenge.id;
        const challengeTitle = todaysChallenge.title;
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', file);
        formData.append('challenge', challengeId);
        formData.append('title', title);
        formData.append('body', body);
        console.log("FILE:", file);
        console.log("TITLE:", title);
        console.log("BODY:", body);
        console.log("CHALLENGE:", todaysChallenge[0]);
        console.log("CHALLENGE ID:", todaysChallenge[0]?.id);
        const postResponse = await fetch('http://localhost:8000/posts/api/create/', {
            method: 'POST',
            headers: {authorization: `Token ${token}`},
            body: formData
        });
        const postData = await postResponse.json();
        console.log("POST data:", postData);

        if (postData.success) {
            const updateData = await fetch('http://localhost:8000/users/api/complete-challenge/', {
                method: 'POST', headers: {
                    authorization: `Token ${token}`, 'Content-Type': 'application/json'
                },
                body: JSON.stringify({challenge_title: challengeTitle})
            });
            const completeData = await updateData.json();
            console.log("COMPLETE CHALLENGE:", completeData);
            if (completeData.success) {
                localStorage.setItem('streak_count', completeData.streak);
                localStorage.setItem('total_points', completeData.total_points);
                navigate('/home');
            }
        }
    }


  return (
    <div className="w-full bg-base-100 min-h-screen p-4 flex flex-col items-center pt-10">

      {/* HEADER BUTTONS */}
      <div className="w-full max-w-4xl flex justify-between mb-8 px-4">
        <h1 className="text-3xl font-bold">Log Today's Challenge</h1>
        <button className="btn btn-outline" onClick={() => navigate("/challenge")}>
          Back to Challenge
        </button>
      </div>

      {/* CONDITIONAL RENDER: Do we have an image yet? */}
      {previewUrl ? (

        /* === STATE 2: THE HERO BANNER & FORM === */
        <div
          className="hero min-h-[70vh] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative"
          style={{ backgroundImage: `url(${previewUrl})` }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center w-full">

            {/* The Frosted Glass Form Card */}
            <div className="card w-full max-w-md bg-base-100/90 backdrop-blur-md text-base-content shadow-xl p-6">

              <h2 className="text-2xl font-bold mb-2">Ready to post?</h2>
              <p className="text-primary font-semibold mb-6">
                {todaysChallenge.title || "Loading challenge..."}
              </p>

              <div className="form-control w-full gap-4">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Give your post a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Tell us about your challenge..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>

                {/* Submit uses your original handleSubmit logic! */}
                <button
                  className="btn btn-primary w-full mt-4"
                  onClick={handleSubmit}
                  disabled={!todaysChallenge.id}
                >
                  Post Challenge
                </button>

                <button
                  className="btn btn-ghost w-full"
                  onClick={() => { setPreviewUrl(null); setFile(null); }}
                >
                  Change Image
                </button>
              </div>
            </div>

          </div>
        </div>
      ) : (

        /* === STATE 1: THE DRAG AND DROP ZONE === */
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full max-w-3xl h-96 mt-10 border-4 border-dashed border-primary rounded-3xl flex flex-col items-center justify-center bg-base-200 hover:bg-base-300 transition-colors"
        >
          <h2 className="text-3xl font-bold mb-4">Drag & Drop</h2>
          <p className="text-base-content/70 mb-8 text-lg">
            Drop your photo for <span className="font-bold text-primary">{todaysChallenge.title || "today's challenge"}</span> right here
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <div className="btn btn-primary pointer-events-none">
            Browse Files
          </div>
        </label>
      )}

    </div>
  );
}

export default LogChallengePage;