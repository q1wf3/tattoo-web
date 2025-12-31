import React from 'react';
import './Certificates.css';

const offers = [
  {
    kind: 'tattoo',
    title: 'Тату',
    discount: '-20%',
    subtitle: 'Сертификат на скидку для любой татуировки',
    description:
      'Подходит для нового эскиза или продолжения проекта. Оформляется быстро, можно подарить.',
    perks: ['Любые стили и размеры', 'Подарочный формат', 'Запись в мессенджере'],
  },
  {
    kind: 'permanent',
    title: 'Перманент',
    discount: '-15%',
    subtitle: 'Сертификат на перманентный макияж',
    description:
      'Для бровей, губ или межреснички. Скидка фиксируется в сертификате и действует при записи.',
    perks: ['Любые зоны', 'Идеально в подарок', 'Удобная запись'],
  },
];

const steps = [
  {
    title: 'Выберите направление',
    text: 'Тату или перманентный макияж. Уточним детали и подберем оптимальную скидку.',
  },
  {
    title: 'Получите сертификат',
    text: 'Электронный формат приходит в день оплаты. Можно подарить или использовать самому.',
  },
  {
    title: 'Запишитесь на дату',
    text: 'Выберите удобное время и подтвердите запись. Скидка применяется на месте.',
  },
];

const terms = [
  {
    title: 'Срок действия',
    text: 'Указывается в сертификате и фиксируется при оформлении.',
  },
  {
    title: 'Передача',
    text: 'Сертификат можно подарить другому человеку без доплат.',
  },
  {
    title: 'Условия',
    text: 'Скидка действует на выбранную услугу и не суммируется с акциями.',
  },
];

const Certificates = () => (
  <main className="certificates-page discount">
    <section className="cert-hero">
      <div className="cert-hero__glow" aria-hidden="true" />
      <div className="cert-hero__ring" aria-hidden="true" />
      <div className="cert-container">
        <span className="cert-kicker">Подарочные сертификаты</span>
        <h1 className="cert-title">Сертификаты на скидку</h1>
        <p className="cert-subtitle">
          Тату или перманент — стильный подарок и повод обновиться. Оформление за пару
          минут, условия прозрачные, скидка закрепляется в сертификате.
        </p>
        <div className="cert-hero__actions">
          <a className="cert-btn primary" href="https://t.me/vikavikatattoo" target="_blank" rel="noreferrer">
            Получить сертификат
          </a>
          <a className="cert-btn ghost" href="https://t.me/vikavikatattoo" target="_blank" rel="noreferrer">
            Задать вопрос
          </a>
        </div>
      </div>
    </section>

    <section className="cert-offers">
      <div className="cert-container">
        <div className="cert-grid">
          {offers.map((offer, index) => (
            <article
              key={offer.kind}
              className={`cert-card cert-card--${offer.kind}`}
              style={{ '--delay': `${index * 140}ms` }}
            >
              <div className="cert-card__header">
                <span className="cert-card__tag">{offer.title}</span>
                <span className="cert-card__discount">{offer.discount}</span>
              </div>
              <h2 className="cert-card__title">{offer.subtitle}</h2>
              <p className="cert-card__desc">{offer.description}</p>
              <ul className="cert-card__list">
                {offer.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <a className="cert-card__cta" href="https://t.me/vikavikatattoo" target="_blank" rel="noreferrer">
                Оформить сертификат
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="cert-steps">
      <div className="cert-container">
        <h2 className="cert-section-title">Как это работает</h2>
        <div className="cert-steps__grid">
          {steps.map((step, index) => (
            <div key={step.title} className="cert-step">
              <span className="cert-step__num">{`0${index + 1}`}</span>
              <h3 className="cert-step__title">{step.title}</h3>
              <p className="cert-step__text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="cert-terms">
      <div className="cert-container">
        <div className="cert-terms__header">
          <h2 className="cert-section-title">Важно знать</h2>
          <p className="cert-section-subtitle">
            Честные условия без мелкого шрифта. Если нужно — подстроим под ваш запрос.
          </p>
        </div>
        <div className="cert-terms__grid">
          {terms.map((term) => (
            <div key={term.title} className="cert-term">
              <h3 className="cert-term__title">{term.title}</h3>
              <p className="cert-term__text">{term.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="cert-final">
      <div className="cert-container cert-final__inner">
        <div>
          <h2 className="cert-final__title">Готовы оформить сертификат?</h2>
          <p className="cert-final__text">
            Напишите удобным способом — ответим быстро и подготовим сертификат под ваш
            запрос.
          </p>
        </div>
        <a className="cert-btn primary" href="https://t.me/vikavikatattoo" target="_blank" rel="noreferrer">
          Перейти к контактам
        </a>
      </div>
    </section>
  </main>
);

export default Certificates;
