import { useNavigate } from "react-router-dom";
import "./PersonalizationPage.css";

function PersonalizationPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your Personalization</h1>


      <button onClick={() => navigate("/profile")}>
        Profile
      </button>
    </div>
  );
}

export default PersonalizationPage;