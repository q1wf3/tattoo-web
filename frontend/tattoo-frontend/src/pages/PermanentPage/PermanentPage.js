import React, { useEffect } from 'react';
import './PermanentPage.css';
import Portfolio from '../Portfolio/Portfolio';
import HowItWorks from '../HowItWorks/HowItWorks';
import TattooServices from '../Services/Services';
const PermanentPage = () => {
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
    <div className="permanent-page">

      {/* HERO — видео */}
      <section 
        className="hero-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/permanent-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Mobile/Tablet Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video mobile-video"
        >
          <source src={`${process.env.PUBLIC_URL}/video-permanent.mp4`} type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Перманентный макияж</h1>
          <p>Эстетичный перманентный макияж, который подчеркивает вашу естественную красоту</p>
        </div>

        {/* Desktop Video Panel */}
        <div className="hero-video-panel desktop-panel">
          <div className="video-panel-wrapper">
            <div className="video-panel-content">
              <video
                className="panel-video"
                src={`${process.env.PUBLIC_URL}/video-permanent.mp4`}
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
      </section>

      {/* Portfolio */}
      <section className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Мои работы</h2>
            <p className="section-subtitle">
              Уникальные работы, созданные с вниманием и профессионализмом
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
              Всё, что нужно для идеального перманентного макияжа — комфортно и безопасно
            </p>
          </div>
          <TattooServices />
        </div>
      </section>

      {/* How it works */}
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

export default PermanentPage;