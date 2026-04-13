import { useNavigate } from "react-router-dom";
import "./FriendRequestPage.css";

function FriendRequestPage() {
    const navigate = useNavigate();


    return (
        <div>
            <h1>Add a Friend</h1>


            <button onClick={() => navigate("/friends")}>
                Back
            </button>
        </div>
    );
}

export default FriendRequestPage;