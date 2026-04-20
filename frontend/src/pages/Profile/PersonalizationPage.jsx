import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import { Link } from "react-router-dom";

function PersonalizationPage() {
  const navigate = useNavigate();
  const categories = ['Adventure', 'Learning', 'Food', 'Creative', 'Nightlife', 'Social', 'Wellness', 'Skills'];
  const [interests, setInterest] = useState([]);
    //gets the user's interests and if they do save the ones already stored and have a max of 4 interests at a time
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/user-preference/", {
        headers: {'Content-Type': 'application/json',
            Authorization: `Token ${token}`}, //goes to update interests to get a list of all of th euser interests
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("fetched interests:", data.interests);
            if (data.interests && data.interests.length > 0) {
                setInterest(data.interests); // if the user has at least 1 interest it sets the interest and allows it to be saved
            }
        });
},[]);

  const handleInterestToggle = (category) =>{
      if(interests.includes(category)){
          setInterest(interests.filter(c => c !== category)); //filter the categories to be checked if the user
      } //has that as one of their interests
      else{
        if (interests.length >= 4) { //limits it to only four interests at a time
        return;
        }
          setInterest([...interests, category]);
      }
  }
  const handleSave = () => {
      const token = localStorage.getItem('token');
      fetch('http://127.0.0.1:8000/users/api/user-preference/',
          { method : 'POST', headers : {'Content-Type': 'application/json',
                  Authorization : `Token ${token}`},
          body: JSON.stringify({interests : interests})  //save the new interests the user has selected
      })//then turn them into a string so that they can be used
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
    
  <div className="relative min-h-screen px-6">
      <button onClick={() => navigate("/profile")} className="pt-15 pl-4 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
        </svg>
      </button>
    <h1 className="mt-10
     text-center text-lg font-bold">Your Personalization</h1>
    <p className="mt-3 text-base text-center font-normal">Select your interests so that we can match you with the best Explory Activities for you!</p>
    <p className="text-sm text-center font-light">(Select up to 4 interests)</p>
    
    <div className="flex justify-center mt-4">
    <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
      {categories.map(category => (
        <label className="label" key={category}>
          <input
            type="checkbox"
            className="toggle"
            checked={interests.includes(category)}
            onChange={() => handleInterestToggle(category)}
          />
          {category}
        </label>
      ))}
      
        <div className="flex justify-center mt-2">
        <button onClick={handleSave} className="btn btn-info btn-s">Save</button>
        </div>
    </fieldset>
    </div>

  </div>
);
}

export default PersonalizationPage;