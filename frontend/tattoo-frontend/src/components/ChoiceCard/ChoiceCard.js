import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChoiceCard.css';

const ChoiceCard = ({ title, description, bgImage, path, accentColor = '#8B4513' }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="choice-card"
      style={{ 
        '--accent-color': accentColor,
        backgroundImage: `url(${bgImage})`
      }}
      onClick={() => navigate(path)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-background"></div>
      <div className="image-overlay"></div>
      
      <div className="card-content">
        <div className="text-content">
          <h2 className="card-title">{title}</h2>
          <p className="card-description">{description}</p>
        </div>
        
        <div className="card-action">
          <button 
            className={`action-button ${isHovered ? 'hovered' : ''}`}
            aria-label={`Перейти к ${title}`}
          >
            <span>Выбрать</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="card-border"></div>
    </div>
  );
};

export default ChoiceCard;