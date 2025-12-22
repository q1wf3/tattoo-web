import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/services">Услуги</Link></li>
          <li><Link to="/">Перманент</Link></li>
          <li><Link to="/contact">Контакты</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
