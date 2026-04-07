import { useState} from "react";
import {useNavigate} from "react-router-dom";


export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleRegister = async () => {
        try{
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log(data.token);

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);

            navigate("/home"); // go home after login
        }
        catch(err){
            setError(err.message || "Registration Failed");
        }
    };

    return (
    <div>
        <h1>Register New Account</h1>
        <button onClick={() => navigate("/")}>
        Back
        </button>
        <hr/>
        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        {error && <p>{error}</p>}
        <button onClick={handleRegister}>Register</button>
        <br/>
        <p>*Password: 8 characters minimum </p>
    </div>
  );
}
