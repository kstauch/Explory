import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="flex flex-col items-center pt-32 px-2">
    <div className="card bg-base-100 shadow-sm w-[28rem] min-h-[32rem]">
  <figure className="w-48 h-48 shrink-0 p-2">
    <img
      src="https://cdn11.bigcommerce.com/s-ftsflnse4o/images/stencil/1280x1280/products/69206/267760/D_869507-MLA28303454752_102018-O__90209.1730772403.jpg?c=1?imbypass=on"
      alt="Profile"
      className="w-full h-full object-cover rounded-full" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{username}</h2>
    <p>User Bio</p>
    <div className="flex items-center pt-12 gap-4">
      <Link to="/friends" className="btn btn-primary">Friends</Link>
      <Link to="/personalization" className="btn btn-primary">Personalization</Link>
    </div>
  </div>
</div>
<div className="fab">
  <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>

  </div>
  <button className="btn btn-lg">Edit Picture</button>
  <button className="btn btn-lg">Edit Username</button>
  <button className="btn btn-lg">Edit Bio</button>
</div>
</div>
    

  );
}

export default ProfilePage;