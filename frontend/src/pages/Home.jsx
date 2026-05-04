import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen overflow-hidden">

      {/* 🔹 HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-12 py-5 border-b border-gray-800"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          AI Media
        </h1>

        <div className="space-x-6">
          <button onClick={() => navigate("/login")} className="hover:text-gray-300">
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-purple-600 px-5 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Signup
          </button>
        </div>
      </motion.header>

      {/* 🔥 HERO */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.9 }}
        className="text-center py-28 px-6 relative"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>

        <h2 className="text-6xl font-bold mb-6 relative bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Build AI Media Instantly 🚀
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg relative">
          Generate images, posters, videos, and ads using multiple AI models —
          all from one powerful platform.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="relative bg-purple-600 px-8 py-4 rounded-xl text-lg transition transform hover:scale-110 hover:bg-purple-700 shadow-xl shadow-purple-900"
        >
          Start Creating
        </button>
      </motion.section>

      {/* 🚀 FEATURES (WIDER + PREMIUM GRID) */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {[
          { title: "🎨 Image Generation", desc: "Create stunning visuals instantly from prompts." },
          { title: "🎬 Video Ads", desc: "Generate AI-powered ads with audio." },
          { title: "📄 PDF Export", desc: "Download designs as high-quality PDFs." },
          { title: "⚡ Fast Processing", desc: "Optimized for speed and performance." },
          { title: "🔐 Secure System", desc: "Your data stays protected and private." },
          { title: "🌐 Multi-Model AI", desc: "Switch between different AI providers easily." }
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.08, y: -10 }}
            className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-purple-900 transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* 🧠 AI FEATURES */}
      <motion.section
        className="max-w-6xl mx-auto px-10 py-20 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
      >
        <h2 className="text-4xl font-bold mb-12">Smart AI Capabilities</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Prompt Enhancement",
            "Auto Model Selection",
            "AI Pipelines",
            "Cost Optimization"
          ].map((text, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-purple-800 to-blue-800 p-5 rounded-xl shadow-md"
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🚀 CTA */}
      <motion.section
        className="text-center py-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6">
          Start Creating with AI Today
        </h2>

        <button
          onClick={() => navigate("/signup")}
          className="bg-purple-600 px-8 py-4 rounded-xl hover:bg-purple-700 transition transform hover:scale-110 shadow-xl shadow-purple-900"
        >
          Get Started Free
        </button>
      </motion.section>

      {/* 🔹 FOOTER */}
      <footer className="text-center py-8 border-t border-gray-800 text-gray-400">
        © 2026 AI Media Platform
      </footer>

    </div>
  );
}

export default Home;