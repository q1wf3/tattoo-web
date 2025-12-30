import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Скролл: добавляем класс "scrolled"
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрывать меню при смене маршрута
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden' : prev || '';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // ESC закрывает меню
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu} aria-label="Перейти на главную">
            <span className="tattoo-symbol">✦</span>
            <span className="tattoo-text">VikaVikaTattoo</span>
            <span className="tattoo-symbol">✦</span>
          </Link>
        </div>

        {/* Overlay для клика вне меню */}
        {menuOpen && (
          <div
            className="menu-overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        <nav
          id="site-nav"
          className={menuOpen ? 'open' : ''}
          aria-label="Основная навигация"
        >
          <ul>
            <li><Link to="/" onClick={closeMenu}>Главная</Link></li>
            <li><Link to="/services" onClick={closeMenu}>Услуги</Link></li>
            <li><Link to="/permanent" onClick={closeMenu}>Перманент</Link></li>
            <li><Link to="/tattoo" onClick={closeMenu}>Тату</Link></li>
            <li><Link to="/certificates" onClick={closeMenu}>Сертификаты</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Контакты</Link></li>
          </ul>
        </nav>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
