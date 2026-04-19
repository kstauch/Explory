import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Navbar
import Navbar from "./components/Navbar";

// Home
import StartPage from "./pages/Home/StartPage";
import RegisterPage from "./pages/Home/RegisterPage";
import LoginPage from "./pages/Home/LoginPage";
import HomePage from "./pages/Home/HomePage";
import MyExploryPage from "./pages/Home/MyExploryPage";

// Challenge
import ChallengePage from "./pages/Challenge/ChallengePage";
import LogChallengePage from "./pages/Challenge/LogChallengePage";

// Profile
import ProfilePage from "./pages/Profile/ProfilePage";
import FriendsPage from "./pages/Profile/FriendsPage";
import PersonalizationPage from "./pages/Profile/PersonalizationPage";
import FriendRequestsPage from "./pages/Profile/FriendRequestsPage"

// Leaderboard
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";


function Layout() {
  const location = useLocation();
  const noNavbarRoutes = ["/", "/login", "/register"];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/log-challenge" element={<LogChallengePage />} />
        <Route path="/explory" element={<MyExploryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/personalization" element={<PersonalizationPage />} />
        <Route path="/friendRequests" element={<FriendRequestsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;