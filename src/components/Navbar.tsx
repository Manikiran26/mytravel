import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Heart, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/bucket-list', label: 'Bucket List', icon: MapPin },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <h2>DreamMap Diaries</h2>
          </Link>
          <ul className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #333;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo h2 {
          color: #FFC300;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ffffff;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #FFC300;
          background: rgba(255, 195, 0, 0.1);
        }

        .nav-link.active {
          color: #FFC300;
          background: rgba(255, 195, 0, 0.15);
        }

        @media (max-width: 768px) {
          .nav-links {
            gap: 1rem;
          }
          
          .nav-link span {
            display: none;
          }
          
          .nav-logo h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;