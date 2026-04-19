import { Link } from "react-router-dom";

export default function Navbar() {
  const closeMenu = () => document.activeElement.blur();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to="/explory" onClick={closeMenu}>My Explory</Link></li>
            <li><Link to="/profile" onClick={closeMenu}>My Profile</Link></li>
            <li><Link to="/leaderboard" onClick={closeMenu}>Leaderboard</Link></li>
            <li><Link to="/" onClick={closeMenu}>Logout</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <span className="text-xl font-bold">Explory</span>
      </div>
      <div className="navbar-end">
        <Link to="/home" className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}