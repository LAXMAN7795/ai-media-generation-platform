import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [filter, setFilter] = useState("all");
  const BASE_URL = "https://backend-api.laxman-sg0104.workers.dev";

  useEffect(() => {
    fetch(`${BASE_URL}/api/media`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setMedia(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* 🔹 TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Media Library 🖼️
        </h1>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          ← Dashboard
        </button>
      </div>

      {/* 🔹 FILTER BUTTONS */}
      <div className="flex gap-4 mb-8">
        {["all", "image", "video"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === type
                ? "bg-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {type === "all"
              ? "All"
              : type === "image"
              ? "Images"
              : "Videos"}
          </button>
        ))}
      </div>

      {/* 🔹 MEDIA GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {media
          .filter(item => filter === "all" || item.type === filter)
          .map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-4 rounded-xl shadow-lg"
            >
              {/* 🔥 TYPE LABEL */}
              <p className="text-xs text-purple-400 mb-2">
                {item.type === "video" ? "🎬 AI Ad Video" : "🖼️ AI Image"}
              </p>

              {/* 🔥 MEDIA */}
              {item.type === "image" && (
                <img
                  src={item.image_url}
                  alt="generated"
                  className="rounded mb-3"
                  referrerPolicy="no-referrer"
                />
              )}

              {item.type === "video" && (
                <video controls className="rounded mb-3">
                  <source src={item.video_url} type="video/mp4" />
                </video>
              )}

              {/* 🔥 INFO */}
              <p className="text-sm text-gray-300 mb-1">
                {item.prompt}
              </p>

              <p className="text-xs text-gray-500">
                Model: {item.model}
              </p>

              <p className="text-xs text-gray-500">
                Cost: ${item.cost}
              </p>
            </motion.div>
          ))}
      </div>

      {/* 🔹 EMPTY STATE */}
      {media.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No media generated yet 🚀
        </p>
      )}

    </div>
  );
}

export default MediaLibrary;