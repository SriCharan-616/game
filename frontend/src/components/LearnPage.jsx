import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [walletId, setWalletId] = useState("");
  const [email, setEmail] = useState("");
  const [isNFT, setIsNFT] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login functionality
    console.log(isNFT ? `Logging in with Wallet: ${walletId}` : `Logging in with Email: ${email}`);
    navigate("/");
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      <div className="login-method">
        <button onClick={() => setIsNFT(true)}>Login with NFT</button>
        <button onClick={() => setIsNFT(false)}>Login without NFT</button>
      </div>

      {isNFT ? (
        <input type="text" placeholder="Enter Wallet ID" value={walletId} onChange={(e) => setWalletId(e.target.value)} />
      ) : (
        <input type="email" placeholder="Enter Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
      )}

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
