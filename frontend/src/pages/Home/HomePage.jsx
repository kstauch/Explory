import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import topImg from "../../assets/ExploryBackground.png";

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [streak, setStreak] = useState("0");
  const [points, setPoints] = useState("0");
  const [friendPosts, setFriendPosts] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
    const storedStreak = localStorage.getItem("streak_count");
    if (storedStreak) setStreak(storedStreak);
    const storedPoints = localStorage.getItem("total_points");
    if (storedPoints) setPoints(storedPoints);
    fetchFriendPosts();
  }, []);

  const fetchFriendPosts = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/friends/posts/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFriendPosts(data));
  };

  return (
    <div>
      <div className="relative flex flex-col overflow-hidden" style={{ height: '500px' }}>
        <img src={topImg} className="w-full h-full object-cover" style={{ objectPosition: 'center 70%' }} alt="background" />
        {/* Content on top of image */}
        <div className="absolute inset-0 flex flex-col justify-center">
        <div className="absolute bg-white opacity-50 z-10" style={{ height: '30%', top: '10%', left: 0, right: 0}}></div>
        <h1 className="absolute text-5xl font-normal z-20" style={{ top: '15%', left: '1rem' }}>Welcome, {username}!</h1>
          <div className="flex justify-center mt-10 relative z-10">
            <button onClick={() => navigate("/challenge")} className="btn btn-accent btn-wide font-light text-lg">
              See Today's Challenge
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="absolute" style={{ height: '4%', top: '73%', left: 0, right: 0, backgroundColor: '#479478'}}></div>
        <p className="relative z-10 mt-3 text-base font-normal px-2 mb-2 text-white">Explore Friend's Recent Activities</p>
        

        {friendPosts.length === 0 ? (
          <p className="text-center opacity-60 mt-4">Looks like your friends haven't posted yet!</p>
        ) : (
          <div className="carousel w-full">
            {friendPosts.map((post, index) => {
              const prevId = `slide${index === 0 ? friendPosts.length : index}`;
              const nextId = `slide${index === friendPosts.length - 1 ? 1 : index + 2}`;
              return (
                <div key={post.id} id={`slide${index + 1}`} className="carousel-item relative w-full flex-col">
                  <img
                    src={`http://127.0.0.1:8000${post.image}`}
                    className="w-full object-cover"
                    alt={post.title}
                  />
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href={`#${prevId}`} className="btn btn-circle">❮</a>
                    <a href={`#${nextId}`} className="btn btn-circle">❯</a>
                  </div>
                  <div className="p-2">
                    <p className="text-lg font-semibold">{post.user}</p>
                    <p className="text-base">{post.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;