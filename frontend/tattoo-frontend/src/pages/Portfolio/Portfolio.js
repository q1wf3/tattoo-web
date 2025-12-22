import { useState, useEffect, useRef, useCallback } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);

  const images = [
    { id: 1, src: `${process.env.PUBLIC_URL}/images/image1.png`, alt: "Татуировка 1" },
    { id: 2, src: `${process.env.PUBLIC_URL}/images/image2.png`, alt: "Татуировка 2" },
    { id: 3, src: `${process.env.PUBLIC_URL}/images/image3.png`, alt: "Татуировка 3" },
    { id: 4, src: `${process.env.PUBLIC_URL}/images/image4.png`, alt: "Татуировка 4" },
    { id: 5, src: `${process.env.PUBLIC_URL}/images/image5.png`, alt: "Татуировка 5" },
    { id: 6, src: `${process.env.PUBLIC_URL}/images/image6.png`, alt: "Татуировка 6" },
    { id: 7, src: `${process.env.PUBLIC_URL}/images/image7.png`, alt: "Татуировка 7" },
    { id: 8, src: `${process.env.PUBLIC_URL}/images/image8.png`, alt: "Татуировка 8" },
    { id: 9, src: `${process.env.PUBLIC_URL}/images/image9.png`, alt: "Татуировка 9" },
    { id: 10, src: `${process.env.PUBLIC_URL}/images/image10.png`, alt: "Татуировка 10" },
    { id: 11, src: `${process.env.PUBLIC_URL}/images/image11.png`, alt: "Татуировка 11" },
    { id: 12, src: `${process.env.PUBLIC_URL}/images/image12.png`, alt: "Татуировка 12" },
  ];

  /* ---------- MOBILE CHECK ---------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* ---------- NEXT/PREV WITH USECALLBACK ---------- */
  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const nextCarousel = useCallback(() => {
    setCarouselIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevCarousel = useCallback(() => {
    setCarouselIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  /* ---------- TOUCH EVENTS ---------- */
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (currentImageIndex !== null) {
        diff > 0 ? nextImage() : prevImage();
      } else if (isMobile) {
        diff > 0 ? nextCarousel() : prevCarousel();
      }
    }
  };

  /* ---------- MOBILE AUTO-CENTERING ---------- */
  useEffect(() => {
    if (carouselRef.current && isMobile) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.offsetWidth * carouselIndex,
        behavior: 'smooth'
      });
    }
  }, [carouselIndex, isMobile]);

  /* ---------- KEYBOARD CONTROL ---------- */
  useEffect(() => {
    if (currentImageIndex === null) return;

    const handleKeys = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setCurrentImageIndex(null);
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [currentImageIndex, nextImage, prevImage]);

  return (
    <div className="portfolio">

      {/* DESKTOP PREMIUM GALLERY */}
      <div className="portfolio-gallery desktop-gallery">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="portfolio-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 3D MOBILE CAROUSEL */}
      <div className="mobile-carousel">
        <div
          className="carousel-3d-wrapper"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`carousel-3d-slide ${
                index === carouselIndex ? "active" : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="carousel-3d-image"
              />
            </div>
          ))}
        </div>

        {/* NAVIGATION */}
        <button className="carousel-nav carousel-prev" onClick={prevCarousel}>
          ‹
        </button>
        <button className="carousel-nav carousel-next" onClick={nextCarousel}>
          ›
        </button>

        {/* INDICATORS */}
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === carouselIndex ? 'active' : ''}`}
              onClick={() => setCarouselIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* MODAL VIEWER */}
      {currentImageIndex !== null && (
        <div className="image-viewer">
          <div
            className="image-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button className="nav-button prev-button" onClick={prevImage}>‹</button>

            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="viewer-image"
            />

            <button className="nav-button next-button" onClick={nextImage}>›</button>
          </div>

          <button className="close-button" onClick={() => setCurrentImageIndex(null)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
