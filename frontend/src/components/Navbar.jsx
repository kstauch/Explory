import { Link } from "react-router-dom";

export default function Navbar() {
  const closeMenu = () => document.activeElement.blur();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="px-3 navbar-start flex items-center gap-1">
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
        <Link to="/home" className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </Link>
      </div>
      <div className="navbar-center">
        <span className="text-2xl font-bold">Explory</span>
      </div>
      <div className="navbar-end px-3">
        <Link to="/challenge" className="btn btn-primary btn-sm">Today's Challenge</Link>
      </div>
    </div>
  );
}