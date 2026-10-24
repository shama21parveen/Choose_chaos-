import AvatarPic, { AVATARS } from "./AvatarPic";

// Grid of avatars. value = selected id, onChange(id)
export default function AvatarPicker({ value, onChange, size = 52, cols = "grid-cols-4 sm:grid-cols-6" }) {
  return (
    <div className={`grid ${cols} gap-3`} role="radiogroup" aria-label="Choose your avatar">
      {AVATARS.map((a) => {
        const on = value === a.id;
        return (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={a.label}
            title={a.label}
            onClick={() => onChange(a.id)}
            className={`pf-pick ${on ? "on" : ""}`}
          >
            <AvatarPic id={a.id} size={size} />
          </button>
        );
      })}
    </div>
  );
}
