import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WalmartTitle.css';
import walmartLogo from '../Assets/Walmart-Logo-PNG-Image.png'; // Adjust the path as necessary

const WalmartTitleIntro = () => {
  const navigate = useNavigate();
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    document.body.classList.add("walmart-theme"); // Apply only to this page
    const slideTimer = setTimeout(() => setSlideOut(true), 4000);
    const navTimer = setTimeout(() => {
      navigate('/login');
      document.body.classList.remove("walmart-theme"); // Remove class after transition
    }, 6000);
    
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(navTimer);
      document.body.classList.remove("walmart-theme"); // Cleanup
    };
  }, [navigate]);

  return (
    <div className={`walmart-container ${slideOut ? 'slide-out' : ''}`}>
      {/* Walmart Logo */}
      <div className="logo-container">
        <img src={walmartLogo} alt="logo" />
      </div>

      {/* Walmart Title */}
      <div className="walmart-title">
        {'WALMART'.split('').map((char, i) => (
          <span key={i} className="letter">{char}</span>
        ))}
      </div>

      {/* Walmart Caption */}
      <p className="walmart-caption">Save Money. Live Better.</p>
    </div>
  );
};

export default WalmartTitleIntro;
