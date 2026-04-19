import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect, useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        setUsername(storedUsername);
    }
  }, []);
  const [streak, setStreak] = useState("0");
  const [points, setPoints] = useState("0");

  useEffect(() => {
      const storedStreak = localStorage.getItem("streak_count");
      if (storedStreak) {
          setStreak(storedStreak);
      }
  },[])

    useEffect(() => {
        const points = localStorage.getItem("total_points");
        if (points) {
            setPoints(points);
        }
    }, [])
  return (
    <div>
      <div className="flex justify-between items-center mt-10 pl-2 pr-10">
      <h1 className="text-3xl font-semibold">Welcome, {username}!</h1>
      <button onClick={() => navigate("/challenge")} className="btn btn-success btn-wide font-light text-lg">
        See Today's Challenge
      </button>
    </div>

      
  <div className="mt-20"> 
    <p className="mt-3 text-base font-light px-5 mb-2">Explore Friend's Recent Activities!</p>   
  <div className="carousel w-full">
    <div id="slide1" className="carousel-item relative w-full flex-col">
      <img
        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide4" className="btn btn-circle">❮</a>
        <a href="#slide2" className="btn btn-circle">❯</a>
      </div>
      <div className="p-2">
        <p className="text-lg font-semibold">User</p>
        <p className="text-base">Activity</p>
      </div>
    </div>
    <div id="slide2" className="carousel-item relative w-full flex-col">
      <img
        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide1" className="btn btn-circle">❮</a>
        <a href="#slide3" className="btn btn-circle">❯</a>
      </div>
      <div className="p-2">
        <p className="text-lg font-semibold">User</p>
        <p className="text-base">Activity</p>
      </div>
    </div>
    <div id="slide3" className="carousel-item relative w-full flex-col">
      <img
        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide2" className="btn btn-circle">❮</a>
        <a href="#slide4" className="btn btn-circle">❯</a>
      </div>
      <div className="p-2">
        <p className="text-lg font-semibold">User</p>
        <p className="text-base">Activity</p>
      </div>
    </div>
    <div id="slide4" className="carousel-item relative w-full flex-col">
      <img
        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
        className="w-full" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a href="#slide3" className="btn btn-circle">❮</a>
        <a href="#slide1" className="btn btn-circle">❯</a>
      </div>
      <div className="p-2">
        <p className="text-lg font-semibold">User</p>
        <p className="text-base">Activity</p>
      </div>
    </div>
  </div>  
</div>

    </div>
  );
}

export default HomePage;