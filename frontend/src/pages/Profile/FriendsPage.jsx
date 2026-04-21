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
  const [selectedFriend, setSelectedFriend] = useState(null);

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

  const handleRemoveFriend = async (friendId, friendUsername) => {
    if (!window.confirm(`Are you sure you want to remove ${friendUsername} from your friends list?`)) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://127.0.0.1:8000/users/api/friends/remove/${friendId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (res.ok) {
        setFriends(friends.filter(f => f.id !== friendId));
        document.getElementById("friend_detail_modal").close();
      } else {
        console.error("Failed to remove friend. status:", res.status);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div className="relative min-h-screen px-6">

      {/* Back Arrow */}
      <button onClick={() => navigate("/profile")} className="pt-15 pl-4 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
        </svg>
      </button>

      {/* Title */}
      <h1 className="mt-10 text-center text-lg font-bold">{username}'s Friends</h1>

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
                  src={friend.profile_picture || DEFAULT_PIC}
                  alt={friend.username} />
                {/* Shows friend's details when clicking on username */}
                <button
                    className="font-semibold hover:text-primary hover:underline text-left cursor-pointer"
                    onClick={() => {
                    setSelectedFriend(friend);
                    document.getElementById("friend_detail_modal").showModal();
                  }}
                >
                  {friend.username}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Add Friend Button + Message */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("add_friend_modal").showModal()}
        >
          Add Friend
        </button>
        {addFriendMessage && <p className="text-sm">{addFriendMessage}</p>}
      </div>

      {/* Friend Requests - bottom right */}
      <div className="fixed bottom-6 right-6 flex items-center gap-3">
        {pendingRequests.length > 0 && (
          <div className="avatar-group -space-x-6">
            {pendingRequests.slice(0, 4).map((req) => (
              <div className="avatar" key={req.id}>
                <div className="w-12">
                  <img
                    src={req.sender.profile_picture || DEFAULT_PIC}
                    alt={req.sender_username}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <button className="btn btn-info" onClick={() => navigate("/friendRequests")}>
          Friend Requests
        </button>
      </div>

      {/* Add Friend Modal */}
      <dialog id="add_friend_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a Friend</h3>
          <input
            type="text"
            placeholder="Enter username"
            className="input input-bordered w-full mt-4"
            value={newFriendUsername}
            onChange={(e) => setNewFriendUsername(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSendRequest}>Send Request</button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Friend Detail Modal */}
      <dialog id="friend_detail_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col items-center text-center">

          {/* only renders contents if a friend has been selected */}
          {selectedFriend && (
            <>
              <img
                className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
                src={selectedFriend.profile_picture || DEFAULT_PIC}
                alt={selectedFriend.username}
              />
              <h3 className="font-bold text-2xl">{selectedFriend.username}</h3>
              <p className="py-4 text-base-content/80 max-w-sm">
                {selectedFriend.bio || "This user hasn't written a bio yet."}
              </p>

              <div className="modal-action w-full flex justify-between mt-4">
                <button
                  className="btn btn-error"
                  onClick={() => handleRemoveFriend(selectedFriend.id, selectedFriend.username)}
                >
                  Remove Friend
                </button>

                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>

    </div>
  );
}

export default FriendsPage;