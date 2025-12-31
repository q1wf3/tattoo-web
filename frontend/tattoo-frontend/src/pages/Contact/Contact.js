import React, { useState } from 'react';
import Popup from '../../components/Popup/Popup';
import './Contact.css';

const Contact = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const togglePopup = () => setIsPopupVisible(!isPopupVisible);
  const loadMap = () => setIsMapLoaded(true);

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.2346134962286!2d39.91502145594151!3d43.434815796859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40f5cbebffeeeeef%3A0xaa06148dc2b68fe1!2zRlJBTksgVEFUVE9PINCi0LDRgtGDINGB0LDQu9C-0L0g0KHQvtGH0Lgg0JDQtNC70LXRgA!5e0!3m2!1sru!2sde!4v1749004432613!5m2!1sru!2sde";

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Контакты</h1>
        <p className="contact-subtitle">Профессиональный подход к каждому клиенту</p>
        <div className="title-divider"></div>
      </div>

      <div className="contact-content">
        <div className="contact-info-grid">
          <div className="contact-info-item">
            <div className="contact-icon-wrapper">
              <i className="fas fa-map-marker-alt contact-icon"></i>
            </div>
            <div className="contact-text">
              <h3>Адрес</h3>
              <p>ул. Примерная, 123, Москва</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-icon-wrapper">
              <i className="fas fa-phone contact-icon"></i>
            </div>
            <div className="contact-text">
              <h3>Телефон</h3>
              <p>+7 (961) 483 4621</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-icon-wrapper">
              <i className="fas fa-envelope contact-icon"></i>
            </div>
            <div className="contact-text">
              <h3>EMAIL</h3>
              <p>info@tattoostudio.ru</p>
            </div>
          </div>
        </div>

        <div className="map-section">
          <h2 className="section-title">Как меня найти</h2>
          <div className="title-divider"></div>
          <div className="map-container">
            {isMapLoaded ? (
              <iframe
                src={mapSrc}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location"
              ></iframe>
            ) : (
              <button className="map-placeholder" onClick={loadMap} type="button">
                <span className="map-placeholder__title">Показать карту</span>
                <span className="map-placeholder__subtitle">Нажмите, чтобы загрузить</span>
              </button>
            )}
          </div>
        </div>

        <div className="contact-action">
          <h2 className="action-title">ГОТОВЫ ОБСУДИТЬ ВАШ ПРОЕКТ?</h2>
          <p className="action-subtitle">Напишите нам, и мы ответим в ближайшее время</p>
          <button className="action-button" onClick={togglePopup}>
            Написать в Telegram
          </button>
        </div>
      </div>

      <Popup isVisible={isPopupVisible} togglePopup={togglePopup} />
    </div>
  );
};

export default Contact;
