import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function LogChallengePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [todaysChallenge, setTodaysChallenge] = useState({ title: "", id: null });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const imageUpload = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
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

  useEffect(() => {
    const savedTitle = localStorage.getItem('rolled_challenge_title');
    const savedId = localStorage.getItem('rolled_challenge_id');
    if (savedTitle) {
      setTodaysChallenge({
        title: savedTitle,
        id: savedId ? parseInt(savedId) : null
      });
    }
  }, []);

  const handleSubmit = async () => {
    if (!file || !todaysChallenge.id) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `post-${todaysChallenge.id}-${Date.now()}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('Explory Media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('Explory Media')
        .getPublicUrl(filePath);

      const token = localStorage.getItem('token');
      const postResponse = await fetch('http://localhost:8000/posts/api/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          challenge: todaysChallenge.id,
          title: title,
          body: body,
          image: publicUrl
        })
      });

      const postData = await postResponse.json();

      if (postData.success) {
        const updateData = await fetch('http://localhost:8000/users/api/complete-challenge/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({challenge_title: todaysChallenge.title})
        });
        if (updateData.status === 409) {
          alert("Awesome post! However, you already got your points for today's challenge. Returning to home!");
          navigate('/explory');
          return;
        }
        const completeData = await updateData.json();

        if (completeData.success) {
          localStorage.setItem('streak_count', completeData.streak);
          localStorage.setItem('total_points', completeData.total_points);
          navigate('/explory');
        }
      }
    } catch (err) {
      console.error("Error during submission:", err);
    }
  };

  return (
    <div className="w-full bg-base-100 min-h-screen p-4 flex flex-col items-center pt-10">

      {/* HEADER */}
      <div className="w-full max-w-4xl flex justify-between mb-4 px-4">
        <h1 className="text-3xl font-bold">Log Today's Challenge:</h1>
        <button className="btn btn-outline" onClick={() => navigate("/challenge")}>
          Back to Challenge
        </button>
      </div>

      {/* CHALLENGE TITLE */}
      <div className="w-full max-w-4xl px-4 mb-8">
        <p className="text-3xl font-semibold text-secondary">{todaysChallenge.title || "Loading challenge..."}</p>
      </div>

      {previewUrl ? (
        /* === STATE 2: HERO BANNER & FORM === */
        <div
          className="hero min-h-[70vh] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative"
          style={{ backgroundImage: `url(${previewUrl})` }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center w-full">
            <div className="card w-full max-w-md bg-base-100/90 backdrop-blur-md text-base-content shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-2">Ready to post?</h2>
              <p className="text-secondary font-semibold mb-6">
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
        /* === STATE 1: DRAG AND DROP ZONE === */
        <div className="w-full max-w-3xl mt-4 flex flex-col items-center">
          <p className="text-base-content/70 mb-6 text-lg text-center">
            Drop your photo and add a caption right here!
          </p>
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="w-full h-64 border-4 border-dashed border-primary rounded-3xl flex flex-col items-center justify-center bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
          >
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
        </div>
      )}
    </div>
  );
}

export default LogChallengePage;