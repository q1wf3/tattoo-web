import React, { useState } from 'react';
import './HowItWorks.css';
import Popup from '../../components/Popup/Popup';

const steps = [
  {
    title: 'Согласование эскиза',
    text: 'Обсуждаем эскиз и вносим правки, если они нужны. Распечатываем несколько вариантов и вместе выбираем лучший.',
  },
  {
    title: 'Подготовка рабочего места',
    text: 'Распечатываем эскиз на специальной бумаге и подготавливаем рабочее место, используя одноразовые расходные материалы и закрывая всё нужное в барьерную защиту.',
  },
  {
    title: 'Перевод трансфера',
    text: 'Подготавливаем кожу: сбриваем волоски и обрабатываем антисептиком. Переводим эскиз, и при необходимости делаем это повторно — до идеального результата.',
  },
  {
    title: 'Нанесение тату',
    text: 'Самый ответственный этап. Мастер аккуратно наносит тату, следит за комфортом клиента. Возможны перерывы — всё по самочувствию.',
  },
  {
    title: 'Клеим заживляющую плёнку',
    text: 'Чтобы облегчить уход, мы бесплатно наклеиваем защитную заживляющую плёнку, которая помогает коже восстановиться.',
  },
];

const HowItWorks = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  return (
    <section className="how-it-works">
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}

        <button className="cta-button" onClick={togglePopup}>
          Записаться на сеанс
        </button>
      </div>

      <Popup isVisible={isPopupVisible} togglePopup={togglePopup} />
    </section>
  );
};

export default HowItWorks;
