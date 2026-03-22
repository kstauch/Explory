import { useNavigate } from "react-router-dom";
import "./FriendsPage.css";

function FriendsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your Friends</h1>


      <button onClick={() => navigate("/profile")}>
        Profile
      </button>
    </div>
  );
}

export default FriendsPage;