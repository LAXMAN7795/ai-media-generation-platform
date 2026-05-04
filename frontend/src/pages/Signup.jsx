import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "https://backend-api.laxman-sg0104.workers.dev";

  const handleSignup = async () => {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">

      {/* 🔥 Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Create Account
        </h2>

        {/* Email */}
        <input
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          className="w-full p-3 mb-4 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-500"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 shadow-lg shadow-purple-900"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        {/* Message */}
        <p className="mt-3 text-sm text-center text-gray-400">
          {message}
        </p>

        {/* Link */}
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;