import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Generate() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [modelId, setModelId] = useState("");
  const [cost, setCost] = useState(null);
  const BASE_URL = "https://backend-api.laxman-sg0104.workers.dev";

  // 🔥 Fetch models from backend
  useEffect(() => {
    fetch(`${BASE_URL}/api/models`)
      .then(res => res.json())
      .then(data => {
        setModels(data);
        if (data.length > 0) {
          setModelId(data[0].id);
        }
      });
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setImage(""); // 🔥 clear previous image before generating

    const res = await fetch(`${BASE_URL}/api/media/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ prompt, modelId })
    });

    const data = await res.json();

    console.log("FULL RESPONSE:", data);

    if (data.success) {
      setTimeout(() => {
        setImage(data.imageUrl);
        setCost(data.cost);
      }, 1000); // ⬅️ increase delay
    } else {
      setImage("");   // 🔥 clear old image
      alert(data.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-8">

      {/* 🔹 BACK */}
      <div className="w-full flex justify-end mb-6">
        <button
          onClick={() => window.location.href = "/dashboard"}
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          ← Dashboard
        </button>
      </div>

      {/* 🔥 TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
      >
        AI Image Generator 🎨
      </motion.h1>

      {/* 🔥 INPUT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-2xl"
      >

        {/* 🔥 Dynamic Model Dropdown */}
        <select
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.provider})
            </option>
          ))}
        </select>

        {/* Prompt */}
        <textarea
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
          rows="3"
          placeholder="Describe the image you want..."
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleGenerate}
          className="bg-purple-600 px-5 py-2 rounded hover:bg-purple-700 transition transform hover:scale-105 shadow-lg shadow-purple-900"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </motion.div>

      {/* 🔥 LOADING STATE */}
      {loading && (
        <p className="mt-6 text-gray-400 animate-pulse">
          Generating image...
        </p>
      )}

      {/* 🔥 IMAGE OUTPUT */}
      {image && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-gray-900 p-4 rounded-xl"
        >
          <img
            key={image}
            src={image}
            alt="Generated"
            className="rounded-lg max-w-full"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.src = image + "&retry=" + Date.now();
            }}
          />
        </motion.div>
      )}

      {/* 🔥 COST */}
      {cost !== null && (
        <p className="mt-4 text-gray-400">
          Cost: ${cost}
        </p>
      )}

    </div>
  );
}

export default Generate;