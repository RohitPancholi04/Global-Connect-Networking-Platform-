import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", { name, email, password });

       if (!res.data.token) {
      throw new Error("No token received from server");
    }
    
      localStorage.setItem("token", res.data.token);
      alert("Signup successful!");
      navigate("/Home"); 
    } catch (err) {
  console.error("Signup error:", err.response?.data || err.message);
  alert(err.response?.data?.message || "Signup failed");
}
  };

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='text-4xl mb-5'>Make the most of your professional life</div>
      <div className='w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10'>
        <div className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Full Name"
            className='w-full text-xl border-2 rounded-lg px-5 py-1'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className='w-full text-xl border-2 rounded-lg px-5 py-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className='w-full text-xl border-2 rounded-lg px-5 py-1'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className='w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 rounded-xl text-xl'
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>

      <div className='mt-4 mb-10'>
        Already on Platform?{" "}
        <Link to={'/login'} className='text-blue-800 cursor-pointer'>Sign in</Link>
      </div>
    </div>
  );
}

export default SignUp;
