import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Компоненты
import Footer from './components/Footer/Footer';

// Страницы
import Choice from './pages/Choice/Choice';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import Permanent from './pages/PermanentPage/PermanentPage';
import TattooPage from './pages/TattooPage/TattooPage';
import Certificates from './pages/Certificates/Certificates';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container header-container">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <span className="tattoo-symbol">✦</span>
              <span className="tattoo-text">VikaVikaTattoo</span>
              <span className="tattoo-symbol">✦</span>
            </Link>
          </div>

          <nav className={menuOpen ? 'open' : ''}>
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
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <main>
      <Routes>
          <Route path="/" element={<Choice />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/permanent" element={<Permanent />} />
          <Route path="/tattoo" element={<TattooPage />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
