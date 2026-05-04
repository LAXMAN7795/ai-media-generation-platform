import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const BASE_URL = "https://backend-api.laxman-sg0104.workers.dev";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [usage, setUsage] = useState({
    totalCost: 0,
    totalGenerations: 0
  });

  useEffect(() => {
    fetch(`${BASE_URL}/api/usage`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setUsage(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">

      {/* 🔥 MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto">

        {/* 🔹 TOP BAR */}
        <div className="flex justify-end mb-8">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* 🔹 STATS */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-400">Total Generations</h3>
            <p className="text-3xl font-bold mt-2">
              {usage.totalGenerations}
            </p>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-400">Total Cost</h3>
            <p className="text-3xl font-bold mt-2">
              ${usage.totalCost}
            </p>
          </div>
        </div>

        {/* 🔥 TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Welcome to AI Dashboard 🚀
        </motion.h1>

        {/* 🔥 FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl cursor-pointer transition hover:shadow-lg hover:shadow-purple-900"
            onClick={() => navigate("/generate")}
          >
            <h2 className="text-lg font-semibold mb-2">🎨 Generate Image</h2>
            <p className="text-gray-400 text-sm">
              Create posters, banners, and visuals using AI.
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl cursor-pointer transition hover:shadow-lg hover:shadow-purple-900"
            onClick={() => navigate("/video")}
          >
            <h2 className="text-lg font-semibold mb-2">🎬 Generate Video</h2>
            <p className="text-gray-400 text-sm">
              Create AI-powered ads with background audio.
            </p>
          </motion.div>

          {/* Library */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl cursor-pointer transition hover:shadow-lg hover:shadow-purple-900"
            onClick={() => navigate("/library")}
          >
            <h2 className="text-lg font-semibold mb-2">🖼️ Media Library</h2>
            <p className="text-gray-400 text-sm">
              View all generated content and history.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/60 border border-gray-800 p-8 rounded-2xl cursor-pointer"
            onClick={() => navigate("/logs")}
          >
            <h2 className="text-xl font-semibold mb-2">📊 Activity Logs</h2>
            <p className="text-gray-400">
              Track your API usage and activity history.
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;