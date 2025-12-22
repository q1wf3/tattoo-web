// TattooPage.js
import React, { useEffect } from 'react';
import './TattooPage.css';
import Portfolio from '../Portfolio/Portfolio';
import HowItWorks from '../HowItWorks/HowItWorks';
import TattooServices from '../Services/Services';

const TattooPage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const openTelegram = () => {
    window.open('https://t.me/vikavikatattoo', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="tattoo-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div
          className="hero-bg-image"
          style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/tattoo-bg.jpg)` }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero-video mobile-video"
        >
          <source src={`${process.env.PUBLIC_URL}/video2.mp4`} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <h1>Татуировки</h1>
            <p>Уникальные татуировки, созданные с вниманием и профессионализмом</p>
            <button className="hero-book-btn" onClick={openTelegram}>
              Записаться
            </button>
          </div>

          {/* Desktop Video Panel */}
          <div className="hero-video-panel desktop-panel">
            <div className="video-panel-wrapper">
              <div className="video-panel-content">
                <video
                  className="panel-video"
                  src={`${process.env.PUBLIC_URL}/video2.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <button className="panel-book-btn" onClick={openTelegram}>
                  Записаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Мои работы</h2>
            <p className="section-subtitle">
              Уникальные татуировки, созданные с вниманием и профессионализмом
            </p>
          </div>
          <Portfolio />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Услуги</h2>
            <p className="section-subtitle">
              Всё, что нужно для идеальной татуировки — комфортно и безопасно
            </p>
          </div>
          <TattooServices />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section howitworks-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Процесс работы</h2>
            <p className="section-subtitle">
              От идеи до результата — комфортно, безопасно, продумано
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

    </div>
  );
};

export default TattooPage;