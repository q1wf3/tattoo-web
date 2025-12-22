import React, { useEffect, useState, useCallback, useRef } from 'react';
import './Certificates.css';

const Certificates = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);

  // Placeholder certificates - replace with actual certificate images
  const certificates = [
    {
      id: 1,
      title: 'Сертификат по татуировке',
      description: 'Профессиональное обучение техникам татуировки',
      image: `${process.env.PUBLIC_URL}/images/image1.png`, // Replace with certificate images
      year: '2023'
    },
    {
      id: 2,
      title: 'Сертификат по перманентному макияжу',
      description: 'Сертифицированный специалист по перманентному макияжу',
      image: `${process.env.PUBLIC_URL}/images/image2.png`, // Replace with certificate images
      year: '2023'
    },
    {
      id: 3,
      title: 'Мастер-класс по цветным татуировкам',
      description: 'Углубленное изучение техник цветной татуировки',
      image: `${process.env.PUBLIC_URL}/images/image3.png`, // Replace with certificate images
      year: '2024'
    },
    {
      id: 4,
      title: 'Сертификат по безопасности',
      description: 'Соблюдение всех стандартов безопасности и гигиены',
      image: `${process.env.PUBLIC_URL}/images/image4.png`, // Replace with certificate images
      year: '2024'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const items = document.querySelectorAll('.certificate-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === certificates.length - 1 ? 0 : prev + 1
    );
  }, [certificates.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1
    );
  }, [certificates.length]);

  const nextCarousel = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % certificates.length);
  }, [certificates.length]);

  const prevCarousel = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  }, [certificates.length]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (touchStart - touchEnd > 50) {
      if (currentImageIndex !== null) {
        nextImage();
      } else {
        nextCarousel();
      }
    }
    if (touchStart - touchEnd < -50) {
      if (currentImageIndex !== null) {
        prevImage();
      } else {
        prevCarousel();
      }
    }
  }, [touchStart, touchEnd, currentImageIndex, nextImage, prevImage, nextCarousel, prevCarousel]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.offsetWidth * carouselIndex,
        behavior: 'smooth'
      });
    }
  }, [carouselIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentImageIndex !== null) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setCurrentImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, nextImage, prevImage]);

  return (
    <div className="certificates-page">
      {/* Hero Section */}
      <section className="certificates-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Сертификаты</h1>
          <p className="hero-subtitle">
            Подтверждение профессиональной квалификации и постоянного развития
          </p>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="certificates-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Мои достижения</h2>
            <p className="section-subtitle">
              Регулярное обучение и повышение квалификации — залог высокого качества работы
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="certificates-grid desktop-grid">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="certificate-item"
                onClick={() => setCurrentImageIndex(index)}
              >
                <div className="certificate-image-wrapper">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="certificate-image"
                    loading="lazy"
                  />
                  <div className="certificate-overlay">
                    <div className="certificate-info">
                      <span className="certificate-year">{cert.year}</span>
                    </div>
                  </div>
                </div>
                <div className="certificate-content">
                  <h3 className="certificate-title">{cert.title}</h3>
                  <p className="certificate-description">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="certificates-carousel mobile-carousel">
            <div
              className="carousel-container"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className="carousel-slide"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="certificate-image-wrapper">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="carousel-certificate-image"
                      loading="lazy"
                    />
                    <div className="certificate-overlay">
                      <div className="certificate-info">
                        <span className="certificate-year">{cert.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="certificate-content">
                    <h3 className="certificate-title">{cert.title}</h3>
                    <p className="certificate-description">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation */}
            <button
              className="carousel-nav carousel-prev"
              onClick={prevCarousel}
              aria-label="Previous certificate"
            >
              ‹
            </button>
            <button
              className="carousel-nav carousel-next"
              onClick={nextCarousel}
              aria-label="Next certificate"
            >
              ›
            </button>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === carouselIndex ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Go to certificate ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      {currentImageIndex !== null && (
        <div className="certificate-viewer">
          <div
            className="viewer-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="nav-button prev-button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous certificate"
            >
              ‹
            </button>

            <img
              src={certificates[currentImageIndex].image}
              alt={certificates[currentImageIndex].title}
              className="viewer-image"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="nav-button next-button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next certificate"
            >
              ›
            </button>
          </div>

          <button
            className="close-button"
            onClick={() => setCurrentImageIndex(null)}
            aria-label="Close viewer"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificates;
