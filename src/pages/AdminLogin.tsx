import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin");
        } catch (err: any) {
            setError("Invalid login credentials");
        }
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: "80px auto",
                padding: 32,
                borderRadius: 12,
                background: "#020617",
                color: "#fff",
            }}
        >
            <h2>Admin Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />

            {error && <p style={{ color: "salmon" }}>{error}</p>}

            <button
                onClick={handleLogin}
                style={{ width: "100%", padding: 12 }}
            >
                Log In
            </button>
        </div>
    );
}
