import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    //allow usernames and passwords be able to be sent and saved
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, //goes through login view and then turns the  JSON into a usable string
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            console.log(data.token);
            //stores the username and token
           localStorage.setItem("token", data.token);
           localStorage.setItem("username", data.user.username);

            navigate("/home"); // go home after login

        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div>
        <h1>Login</h1>

        <button onClick={() => navigate("/")}>
        Back
        </button>
        <hr/>
        

            <input
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />

            <input
                placeholder="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
            />

            {error && <p>{error}</p>}

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}