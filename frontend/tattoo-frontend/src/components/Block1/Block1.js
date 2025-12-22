import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './Block1.css';

const Block1 = () => {
  const desktopTickerRef = useRef(null);
  const mobileTickerRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef(null);

  // Debounced resize handler
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 1366);
  }, []);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    checkMobile();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [checkMobile]);

  // Video error handling
  const handleVideoError = useCallback((e) => {
    console.error('Video playback error:', e);
    // Optionally show user-friendly error message
  }, []);

  useEffect(() => {
    if (mobileVideoRef.current && isMobile) {
      mobileVideoRef.current.load();
      mobileVideoRef.current.play().catch(handleVideoError);
    }
  }, [isMobile, handleVideoError]);

  useEffect(() => {
    const tickerMessages = [
      "✦ Искусство, которое оживает на коже ✦",
      "✦ Твоя индивидуальность — наша работа ✦",
      "✦ Каждая тату — история навсегда ✦",
      "✦ Вырази себя без слов ✦"
    ];

    const startTicker = (element) => {
      if (!element) return null;

      let currentMessageIndex = 0;
      let position = -element.offsetWidth;
      let currentMessage = tickerMessages[currentMessageIndex];

      element.textContent = currentMessage;
      element.style.transform = `translateX(${position}px)`;
      element.style.whiteSpace = 'nowrap';

      const animate = () => {
        if (!element) return;

        const containerWidth = element.parentElement?.offsetWidth || 0;
        position += 2;

        if (position > containerWidth) {
          currentMessageIndex = (currentMessageIndex + 1) % tickerMessages.length;
          currentMessage = tickerMessages[currentMessageIndex];
          element.textContent = currentMessage;
          position = -element.offsetWidth;
        }

        element.style.transform = `translateX(${position}px)`;
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    };

    const cleanupDesktop = isMobile ? null : startTicker(desktopTickerRef.current);
    const cleanupMobile = isMobile ? startTicker(mobileTickerRef.current) : null;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      cleanupDesktop?.();
      cleanupMobile?.();
    };
  }, [isMobile]);

  const openTelegram = useCallback(() => {
    window.open('https://t.me/vikavikatattoo', '_blank', 'noopener,noreferrer');
  }, []);

  const desktopBackgroundStyle = useMemo(() => ({
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundColor: '#0f0f0f',
  }), []);

  return (
    <div className="hero-block" style={!isMobile ? desktopBackgroundStyle : {}}>
      {!isMobile && (
        <>
          <div className="ticker-container" role="marquee" aria-label="Бегущая строка с информацией">
            <div ref={desktopTickerRef} className="ticker-content"></div>
          </div>

          <div className="right-panel">
            <video
              ref={desktopVideoRef}
              className="video-player"
              src={`${process.env.PUBLIC_URL}/video2.mp4`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Видео демонстрации татуировок"
              onError={handleVideoError}
            />
            <button 
              className="book-btn" 
              onClick={openTelegram}
              aria-label="Записаться на сеанс через Telegram"
            >
              Записаться
            </button>
          </div>
        </>
      )}

      {isMobile && (
        <>
          <div className="mobile-video-wrapper">
            <video
              ref={mobileVideoRef}
              className="background-video-mobile"
              src={`${process.env.PUBLIC_URL}/video2.mp4`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label="Фоновое видео демонстрации татуировок"
              onError={handleVideoError}
            />
            <div className="overlay" aria-hidden="true"></div>
          </div>

          <div className="ticker-container mobile-ticker" role="marquee" aria-label="Бегущая строка с информацией">
            <div ref={mobileTickerRef} className="ticker-content"></div>
          </div>

          <div className="mobile-content">
            <h1>Искусство, которое остаётся с тобой</h1>

            <div className="mobile-features">
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true">✸</span>
                <span>Уникальные эскизы</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true">✸</span>
                <span>Индивидуальный подход</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true">✸</span>
                <span>Стерильные условия</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon" aria-hidden="true">✸</span>
                <span>Пожизненная гарантия</span>
              </div>
            </div>

            <p className="mobile-description">
              Создаю татуировки с характером и смыслом для тех, кто чувствует глубже и выбирает навсегда.
            </p>
          </div>

          <button 
            className="book-btn" 
            onClick={openTelegram}
            aria-label="Записаться на сеанс через Telegram"
          >
            Записаться 
          </button>
        </>
      )}
    </div>
  );
};

export default Block1;
