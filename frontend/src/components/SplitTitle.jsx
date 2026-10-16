import { motion } from "framer-motion";

// Heading whose letters pop in one by one when it scrolls into view.
export default function SplitTitle({ text, className = "" }) {
  return (
    <h2 className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0, y: 40, rotate: 6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: i * 0.035, duration: 0.5 }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
    </h2>
  );
}
