import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";

function LogChallengePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const imageUpload = async (e) => {
      const file = e.target.files[0];
        if (file) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
      const formData = new FormData();
      formData.append('challengeimage', file);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/users/api/upload-challenge/',
          {method: 'POST', headers: {authorization: `Token ${token}`},
          body: formData});
      const data = await response.json();
      console.log(data)
  }
  const [todaysChallenge, setTodaysChallenge] = useState([]);
  useEffect(() => {
      const token = localStorage.getItem('token');
      fetch('http://localhost:8000/challenges/api/todays-challenge/',
      {headers: {Authorization: `Token ${token}`}})
      .then(response => response.json())
      .then(data => {
          console.log('challenge data', data);
          setTodaysChallenge(data.challengeslist);
      })
  }, []);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const handleSubmit = async () => {
        const challengeId = todaysChallenge[0]?.id;
        const challengeTitle = todaysChallenge[0]?.title;
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
    <div>
      <h1>Log Today's Challenge</h1>
      <button onClick={() => navigate("/challenge")}>
        Today's Challenge
      </button>
        <br/>
        {previewUrl && (<img src={previewUrl} style={{width: "200px"}} />)}
        <br/>
        <input type="file" accept="image/*" onChange={imageUpload}
            style={{display: "none"}} id="userfile"  />
        <button onClick={() => document.getElementById('userfile').click()}>
            Choose File
        </button>
        <p>{todaysChallenge[0]?.title}</p>
        <input type='text' onChange={(e) =>
            setTitle(e.target.value)} value={title} placeholder='Post title' />
        <br/>
        <input type='text' onChange={(e) =>
        setBody(e.target.value)} value={body} placeholder='Post description' />
        <br/>
      <button onClick={handleSubmit} disabled={!todaysChallenge[0]?.id}>Post</button>
    </div>
  );
}

export default LogChallengePage;