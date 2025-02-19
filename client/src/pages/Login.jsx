/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../components/notification.js';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
const handleSubmit = async (event) => {
  event.preventDefault();
  
  try {
    const response = await axios.post("http://localhost:4000/user/login", { email, password });
    console.log("Login Success:", response.data);
    showToast("Login successful!", "success");
    Cookies.set('email', email, { expires: 1 }); 
    navigate("/user/home");
  } 
  catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    showToast(error.response?.data?.message || "Login failed!", "error");
  }
};


  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center transition-all duration-700 overflow-hidden relative"
      style={{ backgroundImage: "url('./src/assets/Cool-Red-and-Black-Wallpaper-Computer.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 via-purple-900/50 to-black/70 animate-gradient-shift"></div>

      <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 transform hover:scale-[1.01] transition-all duration-300">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl blur opacity-20 transition duration-300"></div>

        <h2 className="text-4xl font-bold pb-6 text-center text-white text-shadow-sm">Login</h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="relative w-full group">
            <input
              type="email"
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaUser />
            </span>
          </div>

          {/* Password */}
          <div className="relative w-full group">
            <input
              type={showPassword ? "text" : "password"}
              className="border border-gray-400/30 w-full rounded-full py-3 px-4 pl-10 pr-10 bg-black/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white placeholder-white/70 transition-all duration-300 group-hover:border-white/50"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/70 group-hover:text-white transition-colors duration-300">
              <FaLock />
            </span>
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-300 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          

          {/* Login Button */}
          <button 
            type="submit"
            className="mt-6 py-3 w-full rounded-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 active:from-red-700 active:to-purple-700 transition-all duration-300 text-white font-semibold transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>

          <p className="mt-3 text-sm text-white text-center">
            Don&apos;t have an account?  

            <Link to="/user/register" className="font-semibold text-red-500"> Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
