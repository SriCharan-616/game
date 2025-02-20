import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Ensure correct path
import "../styles/Navbar.css"
const Navbar = () => {
  console.log("Navbar is rendering"); // Debugging statement

  const authContext = useContext(AuthContext);
  const user = authContext?.user || null;

  return (
    <nav className="navbar">
      <h3>Navbar Loaded</h3> {/* Debugging statement */}
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/problems">Problems</Link>
        <Link to="/learn">Learn</Link>
        <Link to="/games">Games</Link>
        <Link to="/ps">Problem Solving</Link>
      </div>
      <div className="nav-right">
        {user ? <Link to="/user">{user.name}</Link> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
