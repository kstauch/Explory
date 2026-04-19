import { useNavigate } from "react-router-dom";


function MyExploryPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>My Explory Archive</h1>

      <button onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
}

export default MyExploryPage;