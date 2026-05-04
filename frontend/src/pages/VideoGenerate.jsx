import { useState } from "react";
import { motion } from "framer-motion";

function VideoGenerate() {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState("10");
  const [audio, setAudio] = useState("none");
  const [video, setVideo] = useState("");
  const [model, setModel] = useState("free");
  const BASE_URL = "https://backend-api.laxman-sg0104.workers.dev";

  const handleGenerate = async () => {
    const res = await fetch(`${BASE_URL}/api/media/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        prompt,
        duration,
        audio,
        model
      })
    });

    const data = await res.json();

    if (data.success) {
      setVideo(data.videoUrl);
    } else {
      alert("Error generating video");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8">
        <div className="w-full flex justify-end mb-6">
      <button
        onClick={() => window.location.href = "/dashboard"}
        className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg hover:scale-105 transition"
      >
        ← Dashboard
      </button>
    </div>

      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        AI Video Generator 🎬
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-2xl"
      >
        {/* Model Selection */}
            <select
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            >
            <option value="free">Free Model (Pollinations)</option>
            <option value="replicate">Replicate (Paid)</option>
            <option value="openai">OpenAI (Optional)</option>
            </select>

        {/* Prompt */}
        <textarea
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
          rows="3"
          placeholder="Enter video script..."
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Duration */}
        <select
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="5">5 sec</option>
          <option value="10">10 sec</option>
          <option value="20">20 sec</option>
          <option value="30">30 sec</option>
        </select>

        {/* Audio */}
        <select
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
          value={audio}
          onChange={(e) => setAudio(e.target.value)}
        >
          <option value="none">No Audio</option>
          <option value="music1">Background Music 1</option>
          <option value="music2">Background Music 2</option>
        </select>

        {/* Button */}
        <button
          onClick={handleGenerate}
          className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700 transition"
        >
          Generate Video
        </button>
      </motion.div>

      {/* Output */}
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-gray-900 p-4 rounded-xl"
        >
          <video controls className="rounded w-full max-w-xl">
            <source src={video} type="video/mp4" />
          </video>
        </motion.div>
      )}
      
    </div>
  );
}

export default VideoGenerate;