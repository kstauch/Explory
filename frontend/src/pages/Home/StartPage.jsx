import { useState } from "react";
import { useNavigate } from "react-router-dom";
import topImg from "../../assets/ExploryBackground.png";

function StartPage() {
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      document.getElementById("login_modal").close();
      navigate("/home");
    } catch (err) {
      setLoginError("Invalid username or password");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: registerUsername, password: registerPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setRegisterError("Password must be at least 8 characters long.");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      document.getElementById("register_modal").close();
      navigate("/home");
    } catch (err) {
      setRegisterError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
            <div className="relative flex flex-col overflow-hidden" style={{ height: '500px' }}>
              <img src={topImg} className="w-full h-full object-cover" style={{ objectPosition: 'center 70%' }} alt="background" />
        </div>
      <h1 className="mt-6 text-4xl font-bold text-center">Welcome to Explory!</h1>
      <p className="text-base opacity-60 text-center">Your daily activity companion</p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="btn btn-primary btn-wide"
          onClick={() => document.getElementById("login_modal").showModal()}
        >
          Log In
        </button>
        <button
          className="btn btn-outline btn-wide"
          onClick={() => document.getElementById("register_modal").showModal()}
        >
          Register
        </button>
      </div>

      {/* Login Modal */}
      <dialog id="login_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Log In</h3>
          <div className="flex flex-col gap-3 mt-4">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              onChange={e => setLoginUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={e => setLoginPassword(e.target.value)}
            />
            {loginError && <p className="text-error text-sm">{loginError}</p>}
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleLogin}>Log In</button>
            <form method="dialog"><button className="btn">Cancel</button></form>
          </div>
        </div>
      </dialog>

      {/* Register Modal */}
      <dialog id="register_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Account</h3>
          <div className="flex flex-col gap-3 mt-4">
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
              onChange={e => setRegisterUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={e => setRegisterPassword(e.target.value)}
            />
            <p className="text-xs opacity-60">Password: 8 characters minimum</p>
            {registerError && <p className="text-error text-sm">{registerError}</p>}
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleRegister}>Register</button>
            <form method="dialog"><button className="btn">Cancel</button></form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default StartPage;