import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="container">
        <div className="hero-section">
          <div className="hero-content fade-in">
            <h1 className="hero-title">DreamMap Diaries</h1>
            <p className="hero-subtitle">Discover the world's most beautiful destinations</p>
          </div>
          
          <div className="country-card-container slide-in">
            <div className="country-card card">
              <div className="card-image">
                <img 
                  src="https://t4.ftcdn.net/jpg/02/81/14/83/360_F_281148366_Uw03PoKAGUZIAWecL5Op35YPMa7os2uC.jpg"
                  alt="Switzerland"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=entropy&auto=format';
                  }}
                />
                <div className="card-overlay">
                  <div className="card-flag">🇨🇭</div>
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">Switzerland</h3>
                  <span className="card-label">
                    <MapPin size={16} />
                    Country
                  </span>
                </div>
                <p className="card-description">
                  Explore breathtaking Alpine landscapes, pristine lakes, and charming cities 
                  in the heart of Europe. Discover 29 incredible destinations waiting for you.
                </p>
                <Link to="/switzerland" className="btn-primary card-cta">
                  <span>Explore Switzerland</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .homepage {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          padding: 2rem 0;
        }

        .hero-section {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-content {
          margin-bottom: 4rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #FFC300, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #cccccc;
          font-weight: 300;
        }

        .country-card-container {
          display: flex;
          justify-content: center;
        }

        .country-card {
          max-width: 400px;
          width: 100%;
          overflow: hidden;
        }

        .card-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .country-card:hover .card-image img {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7));
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }

        .card-flag {
          font-size: 3rem;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .card-content {
          padding: 2rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #ffffff;
        }

        .card-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 195, 0, 0.2);
          color: #FFC300;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .card-description {
          color: #cccccc;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .card-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .country-card {
            max-width: 100%;
            margin: 0 1rem;
          }
          
          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;