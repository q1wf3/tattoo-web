import React from 'react';
import { Link } from 'react-router-dom';
import './ChoiceCard.css';

const ChoiceCard = ({
  title,
  description,
  bgImage,
  path,
  accentColor = '#b6a97f',
}) => {
  return (
    <Link
      to={path}
      className="choice-card"
      style={{
        '--accent-color': accentColor,
        '--bg-image': `url(${bgImage})`,
      }}
      aria-label={`Перейти к разделу: ${title}`}
    >
      <div className="card-bg" aria-hidden="true" />
      <div className="card-overlay" aria-hidden="true" />

      <div className="card-content">
        <div className="card-text">
          <div className="card-title-wrapper">
            <span className="card-number">{title === 'Тату' ? '01' : '02'}</span>
            <h2 className="card-title">{title}</h2>
          </div>
          <p className="card-desc">{description}</p>
        </div>

        <div className="card-cta">
          <span className="cta-text">Выбрать</span>
          <svg className="cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="card-ring" aria-hidden="true" />
      <div className="card-glow" aria-hidden="true" />
    </Link>
  );
};

export default ChoiceCard;