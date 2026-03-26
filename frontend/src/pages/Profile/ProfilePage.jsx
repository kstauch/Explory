import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your Profile</h1>

      <button onClick={() => navigate("/friends")}>
        Friends
      </button>

      <button onClick={() => navigate("/personalization")}>
        Personalization
      </button>

      <button onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
}

export default ProfilePage;