import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    console.log("📝 Signup clicked");
    console.log("👤 Name:", name);
    console.log("📧 Email:", email);

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        name,
        email,
        password
      });

      // 🔔 verification link message
      toast.info(
        res.data.msg || "Verification link sent to your email 📩"
      );

      // 👉 user ko login page pe bhejo
      navigate("/", { replace: true });
    } catch (err) {
      console.error("❌ Signup failed");
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Signup</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
}

export default Signup;
