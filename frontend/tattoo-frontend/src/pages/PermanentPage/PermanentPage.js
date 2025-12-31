import React, { useEffect } from 'react';
import './PermanentPage.css';
import Portfolio from '../Portfolio/Portfolio';
import HowItWorks from '../HowItWorks/HowItWorks';
import TattooServices from '../Services/Services';
const PermanentPage = () => {
  const permanentImages = [
    { id: 1, src: `${process.env.PUBLIC_URL}/images/IMG_5085.JPG`, alt: 'Перманент 1' },
    { id: 2, src: `${process.env.PUBLIC_URL}/images/IMG_5087.png`, alt: 'Перманент 2' },
    { id: 3, src: `${process.env.PUBLIC_URL}/images/IMG_5104.JPG`, alt: 'Перманент 3' },
    { id: 4, src: `${process.env.PUBLIC_URL}/images/IMG_5105.JPG`, alt: 'Перманент 4' },
  ];
  const permanentServices = [
    {
      title: 'Брови',
      description: 'Естественная форма и цвет. Первичная процедура — 9 000 ₽.',
      image: permanentImages[0].src,
      details: [
        'Коррекция через 1–2 мес. — 5 000 ₽',
        'Рефреш через 6 мес. и более — 7 000 ₽',
      ],
    },
    {
      title: 'Губы',
      description: 'Два эффекта на выбор: помадный или акварель.',
      image: permanentImages[1].src,
      details: [
        'Помадный прокрас: первичная — 11 000 ₽',
        'Коррекция через 1–2 мес. — 6 000 ₽',
        'Рефреш через 6 мес. и более — 9 000 ₽',
        'Акварель: первичная — 9 000 ₽',
        'Коррекция через 1–2 мес. — 5 000 ₽',
        'Рефреш через 6 мес. и более — 7 000 ₽',
        'При правильном пост-уходе коррекция может не понадобиться',
      ],
    },
    {
      title: 'Веки',
      description: 'Мягкий акцент на взгляд. Первичная процедура — 9 000 ₽.',
      image: permanentImages[2].src,
      details: [
        'Коррекция через 1–2 мес. — 5 000 ₽',
        'Рефреш через 6 мес. и более — 7 000 ₽',
      ],
    },
  ];
  const permanentSteps = [
    {
      title: 'Согласование формы и оттенка',
      text: 'Обсуждаем желаемый результат, подбираем форму и цвет с учётом черт лица и типа кожи. Выполняем предварительную разметку и при необходимости вносим правки до полного согласия.',
    },
    {
      title: 'Подготовка рабочего места',
      text: 'Готовим стерильное рабочее место: используем одноразовые расходные материалы, защищаем поверхности барьерной защитой и подготавливаем пигменты.',
    },
    {
      title: 'Разметка и подготовка кожи',
      text: 'Очищаем и обрабатываем кожу антисептиком. Выполняем точную разметку будущего перманента и согласовываем её с клиентом перед началом процедуры.',
    },
    {
      title: 'Нанесение перманентного макияжа',
      text: 'Основной этап процедуры. Мастер аккуратно вводит пигмент, контролируя глубину и равномерность. Работа проходит в комфортном темпе, с учётом ощущений клиента.',
    },
    {
      title: 'Завершающий уход и рекомендации',
      text: 'Обрабатываем зону после процедуры, наносим успокаивающее средство и подробно рассказываем о правилах ухода для правильного заживления и сохранения результата.',
    },
  ];

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
      <section className="hero-section">
        {/* Mobile/Tablet Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video hero-video-bg"
        >
          <source src={`${process.env.PUBLIC_URL}/video-permanent.mp4`} type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content-wrapper">
          <div className="hero-content">
            <span className="hero-kicker">VikaVikaTattoo</span>
            <h1>Перманентный макияж</h1>
            <p>Эстетичный перманентный макияж, который подчеркивает вашу естественную красоту</p>
            <div className="hero-actions">
              <button className="hero-book-btn" onClick={openTelegram}>
                Записаться
              </button>
              <a className="hero-outline-btn" href="#portfolio">
                Смотреть работы
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Мои работы</h2>
            <p className="section-subtitle">
              Уникальные работы, созданные с вниманием и профессионализмом
            </p>
          </div>
          <Portfolio images={permanentImages} />
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
          <TattooServices
            images={permanentImages.map((image) => image.src)}
            services={permanentServices}
          />
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
          <HowItWorks steps={permanentSteps} />
        </div>
      </section>

    </div>
  );
};

export default PermanentPage;
