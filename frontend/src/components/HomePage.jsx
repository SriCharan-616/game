import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showNFTOptions, setShowNFTOptions] = useState(false);

  return (
    <div className="home-page">
      <h1>Welcome to Gamified Learning!</h1>
      
      {/* LOGIN SECTION */}
      <div className="login-section">
        <button onClick={() => setShowLoginOptions(!showLoginOptions)}>Login</button>

        {showLoginOptions && (
          <div className="login-options">
            <button onClick={() => setShowNFTOptions(true)}>Learner</button>
            <button onClick={() => setShowNFTOptions(true)}>Content Creator</button>
          </div>
        )}

        {showNFTOptions && (
          <div className="nft-options">
            <Link to="/login/nft">Login with NFT (Wallet ID)</Link>
            <Link to="/login/email">Login without NFT (Email ID)</Link>
          </div>
        )}
      </div>

      {/* EXPLORE SECTION */}
      <div className="explore-section">
        <h2>Explore</h2>
        <div className="explore-options">
          <Link to="/games" className="explore-item">
            <h3>🎮 Games</h3>
            <p>Play interactive educational games!</p>
          </Link>

          <Link to="/learn" className="explore-item">
            <h3>📚 Learn</h3>
            <p>Enhance your knowledge with our resources.</p>
          </Link>

          <Link to="/problems" className="explore-item">
            <h3>🧩 Problems</h3>
            <p>Challenge yourself with coding problems.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
