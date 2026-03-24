import { useState, useEffect } from "react";

export default function Login() {
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
        }
        catch(err){
            setError("Username or password incorrect");
        }
    };

    return (
    <div>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      {error && <p>{error}</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
