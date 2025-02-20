import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/RippleButton.css";

const RippleScreen = () => {
  const navigate = useNavigate();
  const [ripple, setRipple] = useState(null);

  const handleClick = (event) => {
    if (ripple) return;

    const x = event.clientX;
    const y = event.clientY;
    const size = Math.max(window.innerWidth, window.innerHeight) * 2;

    setRipple({ x, y, size });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="portal-ripple-container"> {/* Merged container */}
      <button className="ripple-button" onClick={handleClick}>
        Enter Portal
      </button>
      {ripple && (
        <div
          className="fullscreen-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      )}
    </div>
  );
};

export default RippleScreen;
