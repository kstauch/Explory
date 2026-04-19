import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FriendsPage.css";

function FriendsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        setUsername(storedUsername);
    }
  }, []);

    return (
        <div>
            <h1 className="mt-16 text-center text-lg font-bold">{username}'s Friends</h1>
            <div className="mt-2 px-6">
            <ul className="list bg-base-100 rounded-box shadow-md max-h-96 overflow-y-auto">

            <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF5xDgb4bejbYOgzup0y_dSJtr9FTwzp-gg&s"/></div>
                <Link to="/archive" className="font-semibold hover:underline">Karol G</Link>
            </li>
            <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://www.bmi.com/images/news/2013/_770/vives_c.jpg"/></div>
                <Link to="/archive" className="font-semibold hover:underline">Carlos Vives</Link>
            </li>
            <li className="list-row">
                <div><img className="size-10 rounded-box" src="https://media.glamour.mx/photos/64d1a09a16414a75ea5877b4/2:3/w_1332,h_1998,c_limit/sabrina.jpg"/></div>
                <Link to="/archive" className="font-semibold hover:underline">Sabrina Carpenter</Link>
            </li>
            </ul>
            </div>
            <div className="flex justify-center mt-30">
            <Link to="/profile" className="btn btn-primary">Back to Profile</Link>
            </div>
        </div>
    );
}

export default FriendsPage;