import { motion } from "framer-motion";

export default function ChoiceCard({ label, onClick, index, secret, soft = false }) {
  if (soft) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.18 }}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={`font-cute flex items-center rounded-full border-2 px-5 py-3.5 text-left text-base font-semibold text-[#4a2540] transition md:text-lg ${
          secret
            ? "border-[#c9a6f0] bg-gradient-to-r from-[#ffe3f1] to-[#ece0ff] shadow-[0_8px_30px_rgba(180,120,240,0.35)]"
            : "border-[#f0b3c6] bg-white/85 hover:bg-[#ffe9f0] hover:shadow-[0_8px_26px_rgba(244,114,182,0.35)]"
        }`}
      >
        <span className="mr-4 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff7aa8] text-sm font-bold text-white">
          {secret ? "✦" : index + 1}
        </span>
        {label}
      </motion.button>
    );
  }

  const style = secret
    ? "glitch border-fuchsia-500/60 hover:border-fuchsia-400 hover:shadow-[0_0_25px_rgba(217,70,239,0.5)]"
    : "border-gold/30 hover:border-gold hover:shadow-[0_0_25px_rgba(212,162,76,0.35)]";

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.02, x: 6 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center rounded-xl border bg-black/60 px-5 py-4 text-left text-base backdrop-blur transition md:text-lg ${style}`}
    >
      <span className="mr-4 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-white/30 font-case text-sm text-gold">
        {index + 1}
      </span>
      {label}
    </motion.button>
  );
}
