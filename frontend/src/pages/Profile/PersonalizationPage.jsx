import { useNavigate } from "react-router-dom";
import "./PersonalizationPage.css";
import {useState} from "react";
import {useEffect} from "react";

function PersonalizationPage() {
  const navigate = useNavigate();
  const categories = ['cooking', 'nature', 'personal health', 'relationship', 'misc'];
  const [interests, setInterest] = useState(categories);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/user-preference/", {
        headers: {'Content-Type': 'application/json',
            Authorization: `Token ${token}`},
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("fetched interests:", data.interests);
            if (data.interests && data.interests.length > 0) {
                setInterest(data.interests);
            }
        });
},[]);

  const handleInterestToggle = (category) =>{
      if(interests.includes(category)){
          setInterest(interests.filter(c => c !== category));
      }
      else{
          setInterest([...interests, category]);
      }
  }
  const handleSave = () => {
      const token = localStorage.getItem('token');
      fetch('http://127.0.0.1:8000/users/api/user-preference/',
          { method : 'POST', headers : {'Content-Type': 'application/json',
                  Authorization : `Token ${token}`},
          body: JSON.stringify({interests : interests})
      })
      .then(res => res.json())
      .then(data => {
          if(data.success === true){
              alert("User saved successfully");
          }
          else{
              alert("User saved failed");
          }
      })
  };
    console.log(interests);
  return (
    <div>
        <h1>Your Personalization</h1>
        <button onClick={() => navigate("/profile")}>
        Profile
        </button>
        <div>
            {categories.map(category => (
                <div key={category}>
                    <input type="checkbox"
                           id = {category}
                           checked={interests.includes(category)}
                           onChange={() => handleInterestToggle(category)}
                    />
                    <label htmlFor={category}>{category}</label>
                </div>
            ))}
        </div>
        <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default PersonalizationPage;