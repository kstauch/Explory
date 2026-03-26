import { useNavigate } from "react-router-dom";
import "./StartPage.css";

function StartPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Explory!</h1>

      <button onClick={() => navigate("/login")}>
        Log In
      </button>

      <button onClick={() => navigate("/register")}>
        Register
      </button>

    </div>
  );
}

export default StartPage;