import { motion } from "framer-motion";

export default function ChoiceCard({ label, onClick, index, secret }) {
  const style = secret
    ? "secret-choice border-red-900/80 hover:border-red-500"
    : "choice-glitch border-gold/30 hover:border-gold hover:shadow-[0_0_25px_rgba(212,162,76,0.35)]";

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
