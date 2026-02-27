import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = async () => {
    if (!data.email || !data.password) {
      return alert("Email and password are required");
    }

    try {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={e =>
          setData({ ...data, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={e =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={login}>Login</button>

      <p>
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
