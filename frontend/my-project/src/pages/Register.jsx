import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await api.post("/auth/register", data);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="First Name"
        value={data.firstname}
        onChange={e =>
          setData({ ...data, firstname: e.target.value })
        }
      />

      <input
        placeholder="Last Name"
        value={data.lastname}
        onChange={e =>
          setData({ ...data, lastname: e.target.value })
        }
      />

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

      <button onClick={register}>Register</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
