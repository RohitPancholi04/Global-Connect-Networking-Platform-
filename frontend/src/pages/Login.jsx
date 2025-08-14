import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        setIsLogin(true);
        navigate("/Home"); // Redirect to homepage or feeds
      } else {
        alert("No token received. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm p-10 bg-white">
        <div className="text-3xl font-bold mb-6 text-center">Sign In</div>

        <div className="flex flex-col gap-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full text-lg border-2 rounded-lg px-5 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full text-lg border-2 rounded-lg px-5 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-xl font-semibold text-white transition-all ${
              loading ? "bg-blue-400" : "bg-blue-800 hover:bg-blue-900"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 mb-14 text-lg">
        New to Global Connect?{" "}
        <Link to="/signUp" className="text-blue-500 hover:underline">
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default Login;
