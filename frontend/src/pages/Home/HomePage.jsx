import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import topImg from "../../assets/ExploryBackground.png";


function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [streak, setStreak] = useState("0");
  const [points, setPoints] = useState("0");
  const [friendPosts, setFriendPosts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

      <div className="mt-30">
        <div className="absolute bg-primary" style={{ height: '4%', top: '84%', left: 0, right: 0 }}></div>
        <p className="relative z-10 mt-20 text-2xl font-semibold pl-4 mb-2">
          Explore Friend Activities
        </p>

        {friendPosts.length === 0 ? (
          <p className="text-center opacity-60 mt-4">Looks like your friends haven't posted yet!</p>
        ) : (
          <div className="relative w-full overflow-hidden" style={{ height: '700px' }}>
            {friendPosts.map((post, index) => (
              <div
                key={post.id}
                className={`absolute inset-0 transition-opacity duration-300 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={post.image}
                  className="w-full h-full object-cover"
                  alt={post.title}
                />
              <div className="absolute bottom-0 left-0 right-0 bg-black p-2">
                <p className="text-2xl font-bold text-white">{post.user}</p>
                <p className="pl-1 mt-3 text-base font-semibold text-white">{post.title}</p>
                <p className="pl-5 font-light text-sm text-white">{post.body}</p>
              </div>
              </div>
            ))}
            {currentSlide > 0 && (
              <button
                className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle z-20"
                onClick={() => setCurrentSlide(currentSlide - 1)}
              >❮</button>
            )}
            {currentSlide < friendPosts.length - 1 && (
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle z-20"
                onClick={() => setCurrentSlide(currentSlide + 1)}
              >❯</button>
            )}
          </div>
        )}
      </div>
      <div className="pb-20"></div>
    </div>
    
  );
}

export default HomePage;