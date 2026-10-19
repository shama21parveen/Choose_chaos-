// Tiny animated "window into the world" used on the genre showcase cards.
const range = (n) => Array.from({ length: n }, (_, i) => i);
const rnd = (i, m) => ((i * 7919 + 13) % m) / m; // deterministic "random"

export default function GenreScene({ id }) {
  if (id === "thriller")
    return (
      <div className="gs">
        <div className="gs-moon" />
        <div className="gs-hotel">
          {range(6).map((i) => (
            <span key={i} className="gs-win" style={{ animationDelay: `${i * 0.7}s` }} />
          ))}
        </div>
        <div className="gs-fog" />
        <div className="gs-fog gs-fog-2" />
        {range(14).map((i) => (
          <span key={i} className="gs-rain" style={{ left: `${rnd(i + 3, 100) * 100}%`, animationDelay: `${rnd(i, 17) * 2}s` }} />
        ))}
      </div>
    );
  if (id === "romance")
    return (
      <div className="gs gs-rom">
        {range(12).map((i) => (
          <span key={i} className="gs-heart" style={{ left: `${rnd(i + 5, 97) * 100}%`, animationDelay: `${rnd(i, 11) * 6}s`, fontSize: `${12 + rnd(i, 7) * 18}px` }}>
            {i % 3 === 0 ? "♥" : "✿"}
          </span>
        ))}
      </div>
    );
  if (id === "scifi")
    return (
      <div className="gs">
        {range(26).map((i) => (
          <span key={i} className="gs-star" style={{ left: `${rnd(i + 1, 101) * 100}%`, top: `${rnd(i + 9, 89) * 100}%`, animationDelay: `${rnd(i, 13) * 3}s` }} />
        ))}
        <div className="gs-planet" />
        <div className="gs-ring" />
      </div>
    );
  return (
    <div className="gs">
      <div className="gs-moon gs-moon-red" />
      {range(3).map((i) => (
        <div key={i} className="gs-eyes" style={{ left: `${14 + i * 30}%`, top: `${58 + (i % 2) * 14}%`, animationDelay: `${i * 1.6}s` }}>
          <span /><span />
        </div>
      ))}
      <div className="gs-fog gs-fog-red" />
    </div>
  );
}
