import React, { useEffect, useRef, useState } from 'react';
import ChoiceCard from '../../components/ChoiceCard/ChoiceCard';
import './Choice.css';

const choices = [
  {
    title: 'Тату',
    description: 'Уникальные татуировки любой сложности',
    bgImage: `${process.env.PUBLIC_URL}/images/tattoo-bg.jpg`,
    path: '/tattoo',
    accentColor: '#b6a97f',
  },
  {
    title: 'Перманент',
    description: 'Эстетичный перманентный макияж',
    bgImage: `${process.env.PUBLIC_URL}/images/permanent-bg.jpg`,
    path: '/permanent',
    accentColor: '#d4a5a5',
  }
];

const Choice = () => {
  const desktopRefs = useRef([]);
  const mobileRefs = useRef([]);
  const [current, setCurrent] = useState(0); // active slide on mobile
  const carouselRef = useRef(null);

  // IntersectionObserver for both desktop and mobile refs
  useEffect(() => {
    const all = [...(desktopRefs.current || []), ...(mobileRefs.current || [])].filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    all.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Swipe handling for mobile carousel (supports touch + mouse)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let startX = 0;
    let currentX = 0;
    let dragging = false;

    const setTranslate = (dx) => {
      el.style.transform = `translateX(${dx}px)`;
    };

    const onStart = (e) => {
      dragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      el.classList.add('dragging');
    };

    const onMove = (e) => {
      if (!dragging) return;
      currentX = e.touches ? e.touches[0].clientX : e.clientX;
      const dx = currentX - startX;
      setTranslate(dx);
    };

    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('dragging');
      const dx = currentX - startX;
      const threshold = Math.max(60, el.clientWidth * 0.12);
      if (dx < -threshold && current < choices.length - 1) setCurrent(c => c + 1);
      else if (dx > threshold && current > 0) setCurrent(c => c - 1);
      // reset transform (animation via CSS)
      el.style.transform = '';
    };

    // touch
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd);
    // mouse
    el.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    return () => {
      el.removeEventListener('touchstart', onStart);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('mousedown', onStart);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
    };
  }, [current]);

  // keyboard nav for mobile
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' && current < choices.length - 1) setCurrent(c => c + 1);
      if (e.key === 'ArrowLeft' && current > 0) setCurrent(c => c - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  return (
    <div className="choice-page">
      <div className="choice-header">
        <h1 className="choice-title">Выберите направление</h1>
        <p className="choice-subtitle">Искусство, которое останется с вами навсегда</p>
      </div>

      {/* DESKTOP */}
      <div className="desktop-layout">
        <div className="choice-grid">
          {choices.map((item, index) => (
            <div
              key={index}
              ref={el => (desktopRefs.current[index] = el)}
              className="card-wrapper"
            >
              <ChoiceCard {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="mobile-layout">
        <div className="choice-carousel-outer">
          <div
            className="choice-carousel"
            ref={carouselRef}
            style={{ transform: `translateX(${ -current * 100 }%)` }}
            aria-roledescription="carousel"
          >
            {choices.map((item, index) => (
              <div
                key={index}
                ref={el => (mobileRefs.current[index] = el)}
                className={`carousel-card-wrapper ${current === index ? 'active' : ''}`}
                aria-hidden={current !== index}
              >
                <ChoiceCard {...item} />
              </div>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="carousel-controls" aria-hidden={choices.length <= 1}>
          {choices.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Перейти к слайду ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choice;
