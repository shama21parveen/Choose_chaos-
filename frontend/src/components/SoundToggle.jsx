export default function SoundToggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={on ? "Mute sound" : "Turn sound on"}
      className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 font-case text-xs uppercase tracking-widest text-bone backdrop-blur transition hover:border-gold hover:text-gold"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
        {on ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ) : (
          <path d="m16 9 6 6m0-6-6 6" />
        )}
      </svg>
      Sound {on ? "on" : "off"}
    </button>
  );
}
