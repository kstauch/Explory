import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DEFAULT_PIC = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";

function FriendsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState("");
  const [addFriendMessage, setAddFriendMessage] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
    fetchFriends();
    fetchPendingRequests();
  }, []);

  const fetchFriends = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/friends/list/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFriends(data));
  };

  const fetchPendingRequests = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/friends/requests/pending/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPendingRequests(data));
  };

  const handleSendRequest = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/friends/request/send/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ receiver_username: newFriendUsername }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAddFriendMessage("Friend request sent!");
          setNewFriendUsername("");
          document.getElementById("add_friend_modal").close();
        } else {
          setAddFriendMessage(data.error || "Something went wrong.");
          document.getElementById("add_friend_modal").close();
        }
      });
  };

  return (
    <div className="relative min-h-screen px-6">
        <div className="join grid grid-cols-2">
            <button className="join-item btn btn-outline">Friend's Leaderboard</button>
            <button className="join-item btn btn-outline" onCLick="">Global Leaderboard</button>
           </div>

      {/* Back Arrow */}
      <button onClick={() => navigate("/profile")} className="pt-15 pl-4 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
        </svg>
      </button>

      {/* Title */}
      <h1 className="mt-10 text-center text-lg font-bold">{username}'s Friends Leaderboard</h1>

      {/* Friends List */}
      <div className="mt-4">
        <ul className="bg-base-100 rounded-box shadow-md max-h-96 overflow-y-auto divide-y">
          {friends.length === 0 ? (
            <li className="p-4 text-center opacity-60">No friends yet!</li>
          ) : (
            friends.map((friend) => (
              <li key={friend.id} className="flex items-center gap-4 p-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={friend.profile_picture ? `http://127.0.0.1:8000${friend.profile_picture}` : DEFAULT_PIC}
                  alt={friend.username} />
                <Link to="/archive" className="font-semibold hover:underline">{friend.username}</Link>
              </li>
            ))
          )}
        </ul>
      </div>

    </div>
  );
}

export default FriendsPage;