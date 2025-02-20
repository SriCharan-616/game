import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext); // Get user state from AuthContext

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
      </div>
      <div className="nav-right">
        {user ? <Link to="/user">{user.name}</Link> : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
