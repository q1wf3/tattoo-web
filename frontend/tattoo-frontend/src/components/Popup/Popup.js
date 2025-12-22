import React from 'react';
import './Popup.css';

const Popup = ({ isVisible, togglePopup }) => {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={togglePopup}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={togglePopup}>
          ✕
        </button>

        <img
          src="/images/image8.png"
          alt="Tattoo artist"
          className="popup-avatar"
        />

        <h2 className="popup-title">Готовы к новой татуировке?</h2>
        <p className="popup-text">
          Свяжитесь со мной в <strong>Telegram</strong>, чтобы обсудить эскиз и выбрать удобное время.
        </p>

        <a
          href="https://t.me/vikavikatattoo"
          target="_blank"
          rel="noopener noreferrer"
          className="popup-button"
        >
           Написать в Telegram
        </a>
      </div>
    </div>
  );
};

export default Popup;
