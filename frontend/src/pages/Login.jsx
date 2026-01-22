import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const submit = async (e) => {
    e.preventDefault();

    console.log("👉 Login clicked");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );

      const token = res.data.token;
      
      console.log("✅ Login Success");
      console.log(`✅ ${email} is logged in`);
      console.log("🪙 Token:", token);

      localStorage.setItem("token", token);

      toast.success("Login successful 🚀");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("❌ Login failed");
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>

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
      <button type="submit">Login</button> 
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </form>
  );
}

export default Login;
