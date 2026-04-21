import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DEFAULT_PIC = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";

function MyExploryPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) setUsername(storedUsername);
        
        const token = localStorage.getItem("token");
        
        fetch("http://127.0.0.1:8000/users/api/profile/", {
          headers: { Authorization: `Token ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            setProfilePicture(data.profile_picture ? data.profile_picture : DEFAULT_PIC);
          });

        fetchMyPosts();
      }, []);

  const fetchMyPosts = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/posts/api/my-posts/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPosts(data.data);
      });
  };

  return (
    <div className="px-4 pt-8 pb-16">
    <div className="flex items-center gap-4 mb-8">
      <img
        src={profilePicture || DEFAULT_PIC}
        className="w-14 h-14 rounded-full object-cover"
        alt="Profile"
      />
      <h1 className="text-3xl font-bold">{username}'s Activities Archive</h1>
    </div>
      {posts.length === 0 ? (
        <p className="text-center opacity-60 mt-8">You haven't posted any challenges yet!</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative overflow-hidden" style={{ height: '300px' }}>
              <img
                src={post.image ? post.image : DEFAULT_PIC}
                className="w-full h-full object-cover"
                alt={post.title}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black p-2">
                <p className="text-sm font-bold text-white">{post.user}</p>
                <p className="text-xs font-semibold text-white">{post.title}</p>
                <p className="text-xs text-white opacity-80">{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyExploryPage;