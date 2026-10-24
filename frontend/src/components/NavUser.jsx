import { Link } from "react-router-dom";
import { useApp } from "../context";
import AvatarPic from "./AvatarPic";
import "../profile.css";

// Top-right of the nav: "LOG IN" button for guests, avatar + name (opens profile) + log out for players.
export default function NavUser() {
  const { user, logout, openAuth } = useApp();
  if (!user) {
    return (
      <button onClick={openAuth} className="neon-btn" aria-label="Log in or join">
        <span>LOG IN</span>
      </button>
    );
  }
  return (
    <div className="nav-user">
      <Link to="/profile" className="nav-user-link" aria-label="Open my profile" data-cursor="PROFILE">
        <span className="nav-user-av"><AvatarPic id={user.avatar || "ghost"} size={34} /></span>
        <span className="nav-user-name">{user.username || user.name}</span>
      </Link>
      <button onClick={logout} className="nav-user-out">Log out</button>
    </div>
  );
}
