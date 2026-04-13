import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./LogChallengePage.css";

function LogChallengePage() {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
      const imageUpload = async (e) => {
      const file = e.target.files[0];
        if (file) {
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
      <button onClick={() => navigate("/challenge")}>Post</button>
    </div>
  );
}

export default LogChallengePage;