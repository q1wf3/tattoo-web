import React, { useState } from 'react';
import Portfolio from '../Portfolio/Portfolio';
import Block1 from '../../components/Block1/Block1';
import HowItWorks from '../HowItWorks/HowItWorks';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showChoice, setShowChoice] = useState(true);

  const goToTattoo = () => {
    setShowChoice(false);
    setTimeout(() => navigate('/tattoo'), 300);
  };

  const goToPermanent = () => {
    setShowChoice(false);
    setTimeout(() => navigate('/permanent'), 300);
  };

  return (
    <div className="home">
      {/* FULLSCREEN CHOICE */}
      {showChoice && (
        <div className="choice-overlay">
          <div className="choice-grid">
            <div
              className="choice-card"
              onClick={goToTattoo}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/tattoo-bg.jpg)` }}
            >
              <div className="overlay"></div>
              <h2>Тату</h2>
              <p>Уникальные татуировки любой сложности</p>
            </div>

            <div
              className="choice-card"
              onClick={goToPermanent}
              style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/permanent-bg.jpg)` }}
            >
              <div className="overlay"></div>
              <h2>Перманент</h2>
              <p>Эстетичный перманентный макияж</p>
            </div>
          </div>
        </div>
      )}

      {/* Основная страница */}
      <Block1 />

      <main className="main-content">
        <section className="portfolio-section">
          <h2>Работы</h2>
          <Portfolio />
        </section>
        <HowItWorks />
      </main>
    </div>
  );
};

export default Home;
