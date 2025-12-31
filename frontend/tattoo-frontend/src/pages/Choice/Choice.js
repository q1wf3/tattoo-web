import React, { useEffect, useState } from 'react';
import ChoiceCard from '../../components/ChoiceCard/ChoiceCard';
import './Choice.css';

const Choice = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // ✅ ВАЖНО: ставим класс на body, чтобы ТОЛЬКО на этой странице сделать navbar sticky
  useEffect(() => {
    document.body.classList.add('choice-route');
    return () => document.body.classList.remove('choice-route');
  }, []);

  const choices = [
    {
      title: 'Тату',
      description: 'Уникальные татуировки любой сложности и стиля',
      bgImage: `${process.env.PUBLIC_URL}/images/tattoo-bg.jpg`,
      path: '/tattoo',
      accentColor: '#b6a97f',
    },
    {
      title: 'Перманент',
      description: 'Эстетичный перманентный макияж и коррекция',
      bgImage: `${process.env.PUBLIC_URL}/images/permanent-bg.jpg`,
      path: '/permanent',
      accentColor: '#d4a5a5',
    },
  ];

  return (
    <section className={`choice-page premium ${mounted ? 'is-mounted' : ''}`}>
      <div className="choice-shell">
        {/* ? ПРОСТО ТЕКСТ НАД КАРТОЧКАМИ */}
        <div className="choice-heading">
          <span className="choice-badge">VikaVikaTattoo</span>
          <h1 className="choice-title">Выберите направление</h1>
          <p className="choice-subtitle">Один клик - и вы сразу попадёте в нужный раздел</p>
        </div>

        <div className="choice-grid">
          {choices.map((item, i) => (
            <div key={item.title} className="choice-item" style={{ '--d': `${i * 120}ms` }}>
              <ChoiceCard {...item} />
            </div>
          ))}
        </div>

        <div className="choice-footer">
          <span className="choice-dot" aria-hidden="true" />
          <span className="footer-text">Быстрый выбор • Профессиональный подход</span>
        </div>
      </div>
    </section>
  );
};

export default Choice;
