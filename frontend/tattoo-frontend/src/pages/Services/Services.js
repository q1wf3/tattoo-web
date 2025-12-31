import React, { useState } from 'react';
import Popup from '../../components/Popup/Popup';
import './Services.css';

const TattooServices = ({ images, services: servicesOverride }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const serviceImages = Array.isArray(images) ? images : [];

  const services = servicesOverride || [
    {
      title: 'Персональные татуировки',
      description: 'Выбор уникального дизайна...',
      image: serviceImages[0] || process.env.PUBLIC_URL + '/images/image9.png',
      details: ['Индивидуальный эскиз', 'Консультация', 'Гарантия качества']
    },
    {
      title: 'Консультации по дизайну',
      description: 'Не знаете, какой дизайн выбрать?',
      image: serviceImages[1] || process.env.PUBLIC_URL + '/images/image10.png',
      details: ['3D-визуализация', 'Рекомендации', 'Проработка идеи']
    },
    {
      title: 'Обновление татуировок',
      description: 'Коррекция и перекрытие старых работ.',
      image: serviceImages[2] || process.env.PUBLIC_URL + '/images/image1.png',
      details: ['Коррекция контура', 'Добавление деталей', 'Перекрытие']
    }
  ];

  const togglePopup = (service = null) => {
    setSelectedService(service);
    setIsPopupVisible(prev => !prev);
  };

  return (
    <section className="tattoo-services">
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">

              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                  loading="lazy"
                />
              </div>

              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <ul className="service-features">
                  {service.details.map((detail, i) => (
                    <li key={i} className="feature-item">✓ {detail}</li>
                  ))}
                </ul>

                <button
                  className="cta-button"
                  onClick={() => togglePopup(service)}
                >
                  ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <Popup
        isVisible={isPopupVisible}
        togglePopup={togglePopup}
        service={selectedService}
      />
    </section>
  );
};

export default TattooServices;
