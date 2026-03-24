import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Home
import HomePage from "./pages/Home/HomePage";
import MyExploryPage from "./pages/Home/MyExploryPage";
import Login from "./pages/Home/Login";

// Challenge
import ChallengePage from "./pages/Challenge/ChallengePage";
import LogChallengePage from "./pages/Challenge/LogChallengePage";

// Profile
import ProfilePage from "./pages/Profile/ProfilePage";
import FriendsPage from "./pages/Profile/FriendsPage";
import PersonalizationPage from "./pages/Profile/PersonalizationPage";

// Leaderboard
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

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