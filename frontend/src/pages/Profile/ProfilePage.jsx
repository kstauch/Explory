import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DEFAULT_PIC = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";

function ProfilePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(DEFAULT_PIC);
  const [newBio, setNewBio] = useState("");
  const [newPicture, setNewPicture] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/profile/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
        setBio(data.bio || "");
        setProfilePicture(data.profile_picture ? `http://127.0.0.1:8000${data.profile_picture}` : DEFAULT_PIC);
      });
  };

  const handleSaveBio = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/users/api/profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ bio: newBio }),
    }).then(() => {
      setBio(newBio);
      setNewBio("");
      document.getElementById("bio_modal").close();
    });
  };

  const handleSavePicture = () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profile_picture", newPicture);
    fetch("http://127.0.0.1:8000/users/api/profile/", {
      method: "POST",
      headers: { Authorization: `Token ${token}` },
      body: formData,
    }).then(() => {
      setProfilePicture(URL.createObjectURL(newPicture));
      setNewPicture(null);
      document.getElementById("picture_modal").close();
    });
  };

  return (
    <div className="flex flex-col items-center pt-32 px-2">
      <div className="card bg-base-100 shadow-sm w-[28rem] min-h-[32rem]">
        <figure className="w-48 h-48 shrink-0 p-2">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{username}</h2>
          <p>{bio || "No bio yet."}</p>
          <div className="flex items-center pt-12 gap-4">
            <Link to="/friends" className="btn btn-primary">Friends</Link>
            <Link to="/personalization" className="btn btn-primary">Personalization</Link>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="fab">
        <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </div>
        <button className="btn btn-lg" onClick={() => document.getElementById("picture_modal").showModal()}>Edit Picture</button>
        <button className="btn btn-lg" onClick={() => document.getElementById("bio_modal").showModal()}>Edit Bio</button>
      </div>

      {/* Edit Picture Modal */}
      <dialog id="picture_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Profile Picture</h3>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mt-4"
            onChange={(e) => setNewPicture(e.target.files[0])}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSavePicture}>Save</button>
            <form method="dialog"><button className="btn">Cancel</button></form>
          </div>
        </div>
      </dialog>

      {/* Edit Bio Modal */}
      <dialog id="bio_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Bio</h3>
          <textarea
            placeholder="Write something about yourself..."
            className="textarea textarea-bordered w-full mt-4"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleSaveBio}>Save</button>
            <form method="dialog"><button className="btn">Cancel</button></form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ProfilePage;