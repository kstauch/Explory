import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
const DEFAULT_PIC = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";

function FriendRequestsPage() {
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/friends/requests/pending/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPendingRequests(data));
  };

  const handleAccept = (friendshipId) => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/friends/request/accept/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ friendship_id: friendshipId }),
    }).then(() => {
      setAccepted([...accepted, friendshipId]);
    });
  };

  const handleReject = (friendshipId) => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/users/api/friends/request/reject/${friendshipId}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    }).then(() => {
      setPendingRequests(pendingRequests.filter((r) => r.id !== friendshipId));
    });
  };

  return (
    <div className="relative min-h-screen px-6">
    <button onClick={() => navigate("/friends")} className="pt-15 pl-4 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
    </svg>
    </button>
      <h1 className="mt-8 text-center text-lg font-bold">Friend Requests</h1>

      <div className="mt-4 px-6">
        <ul className="bg-base-100 rounded-box shadow-md max-h-96 overflow-y-auto divide-y">
          {pendingRequests.length === 0 ? (
            <li className="p-4 text-center opacity-60">No pending requests!</li>
          ) : (
            pendingRequests.map((req) => (
              <li key={req.id} className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-4">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={req.sender.profile_picture ? `http://127.0.0.1:8000${req.sender.profile_picture}` : DEFAULT_PIC}
                    alt={req.sender_username}
                />
                  <span className="font-semibold">{req.sender_username}</span>
                </div>
                <div>
                  {accepted.includes(req.id) ? (
                    <span className="text-success font-semibold text-sm">Accepted</span>
                  ) : (
                    <div className="flex gap-2">
                      <button className="btn btn-success btn-sm" onClick={() => handleAccept(req.id)}>Accept</button>
                      <button className="btn btn-error btn-sm" onClick={() => handleReject(req.id)}>Deny</button>
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

    </div>
  );
}

export default FriendRequestsPage;