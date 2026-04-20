import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DEFAULT_PIC = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";

function FriendsPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [friends, setFriends] = useState([]);
  const [activeTab, setActiveTab] = useState("friends");
  const [globalUsers, setGlobalUsers] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
    fetchFriends();
    fetchGlobalLeaderboard();
  }, []);

  const fetchFriends = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/leaderboard/friends/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFriends(data));
  };
  const fetchGlobalLeaderboard = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/users/api/leaderboard/global/", {
        headers: { Authorization: `Token ${token}` },
    });
    const data = await res.json();
    console.log("LEADERBOARD DATA:", data); // Add this!
    setGlobalUsers(data);
  };






  const listToRender = activeTab === "friends" ? friends : globalUsers;
  return (
    <div className="relative min-h-screen px-6">
        <div className="join grid grid-cols-2">
            <button
            onClick={() => setActiveTab("friends")}
            className={`join-item btn ${activeTab === "friends" ? "btn-active" : "btn-outline"}`}
            >
            Friends Leaderboard
            </button>
            <button
                onClick={() => setActiveTab("global")}
                className={`join-item btn ${activeTab === "global" ? "btn-active" : "btn-outline"}`}
                >
                 Global Leaderboard
            </button>
           </div>

      {/* Title */}
    <h1 className="mt-10 text-center text-lg font-bold">
        {activeTab === "friends" ? `${username}'s Friends Leaderboard` : "Global Leaderboard"}
    </h1>

      {/* Dynamic Leaderboard List */}
      <div className="mt-6">
        <ul className="bg-base-100 rounded-box shadow-md max-h-[70vh] overflow-y-auto divide-y border border-base-300">

          {listToRender.length === 0 ? (
            <li className="p-8 text-center opacity-60 font-medium">No users found!</li>
          ) : (
            listToRender.map((user) => {

              const isMe = user.username === username;

              return (
                <li
                  key={user.id}
                  className={`flex items-center gap-4 p-4 transition-colors ${
                      isMe ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-base-200"
                  }`}
                >
                  <img
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                    src={user.profile_picture || DEFAULT_PIC}
                    alt={user.username}
                  />

                  <div className="flex flex-col">
                      <Link to="/archive" className="font-bold hover:text-primary transition-colors text-lg">
                          {user.username}
                          {isMe && <span className="ml-2 badge badge-primary badge-sm">You</span>}
                      </Link>
                  </div>

                  <span className="ml-auto font-black text-xl text-primary">
                      {user.total_points || 0} 🏆
                  </span>

                  <span className="text-sm font-bold text-base-content/60 mt-1">
                       {user.streak_count || 0} 🔥
                  </span>
                </li>
              );
            })
          )}

        </ul>
      </div>


    </div>
  );
}

export default FriendsPage;