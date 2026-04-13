import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import FriendRequestPage from "./pages/Profile/FriendRequestPage"

// Leaderboard
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Challenge Flow */}
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/log-challenge" element={<LogChallengePage />} />

        {/* MyExplory */}
        <Route path="/explory" element={<MyExploryPage />} />

        {/* Profile Flow */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/personalization" element={<PersonalizationPage />} />

        {/* Leaderboard */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;