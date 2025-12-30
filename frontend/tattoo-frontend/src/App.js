import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Компоненты
import Header from './components/Header/Header';
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
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          {/* ВАЖНО: СНАЧАЛА ВЫБОР */}
          <Route path="/" element={<Choice />} />

          {/* Home оставим как отдельную страницу, если надо */}
          <Route path="/home" element={<Home />} />

          <Route path="/services" element={<Services />} />
          <Route path="/permanent" element={<Permanent />} />
          <Route path="/tattoo" element={<TattooPage />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />

          {/* если кто-то зайдет на /choice — ведем на / */}
          <Route path="/choice" element={<Navigate to="/" replace />} />

          {/* Любой неизвестный маршрут -> на выбор */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
