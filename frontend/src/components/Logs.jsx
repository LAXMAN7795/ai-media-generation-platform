import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Logs() {
  const [logs, setLogs] = useState([]);
  const BASE_URL = "https://backend-api.laxman-sg0104.workers.dev";

  useEffect(() => {
    fetch(`${BASE_URL}/api/logs`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">

      {/* 🔹 Header */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Activity Logs 📊
        </h1>

        <button
          onClick={() => window.location.href = "/dashboard"}
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
        >
          ← Dashboard
        </button>
      </div>

      {/* 🔥 Logs List */}
      <div className="grid gap-4 max-w-4xl">

        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 border border-gray-800 p-4 rounded-xl shadow"
          >
            <p className="text-sm text-purple-400 font-semibold">
              {log.action}
            </p>

            <p className="text-gray-300 mt-1">
              {log.details}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(log.created_at).toLocaleString()}
            </p>
          </motion.div>
        ))}

        {logs.length === 0 && (
          <p className="text-gray-400">No activity yet</p>
        )}

      </div>
    </div>
  );
}

export default Logs;