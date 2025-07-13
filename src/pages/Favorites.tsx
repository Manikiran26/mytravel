import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { switzerlandDestinations } from '../data/switzerlandDestinations';

interface Props {
  favorites: string[];
}

const Favorites: React.FC<Props> = ({ favorites }) => {
  const favoriteDestinations = switzerlandDestinations.filter(dest => 
    favorites.includes(dest.id)
  );

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Your Favorites</h1>
          <p>Your handpicked collection of Swiss destinations</p>
        </div>

        {favoriteDestinations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-content">
              <Heart size={64} className="empty-icon" />
              <h3>No favorites yet</h3>
              <p>Start exploring Switzerland destinations and click the heart icon to add places to your favorites!</p>
            </div>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteDestinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="favorite-card card slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-image">
                  <img 
                    src={destination.images[0]}
                    alt={destination.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';
                    }}
                  />
                  <div className="favorite-badge">
                    <Heart size={18} fill="#FFC300" color="#FFC300" />
                  </div>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="destination-name">{destination.name}</h3>
                    <span className="destination-category">
                      <MapPin size={14} />
                      {destination.category}
                    </span>
                  </div>
                  <p className="destination-description">
                    {destination.history.substring(0, 120)}...
                  </p>
                  <div className="destination-info">
                    <div className="info-item">
                      <strong>Best time:</strong> {destination.bestTimeToVisit}
                    </div>
                    <div className="info-item">
                      <strong>Entry:</strong> {destination.entryFee}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .favorites-page {
          padding: 2rem 0;
          min-height: calc(100vh - 80px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 3rem;
          color: #FFC300;
          margin-bottom: 1rem;
        }

        .page-header p {
          font-size: 1.2rem;
          color: #cccccc;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .empty-content {
          text-align: center;
          max-width: 400px;
        }

        .empty-icon {
          color: #333;
          margin-bottom: 1rem;
        }

        .empty-content h3 {
          color: #FFC300;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .empty-content p {
          color: #cccccc;
          line-height: 1.6;
        }

        .favorites-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .favorite-card {
          overflow: hidden;
        }

        .card-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .favorite-card:hover .card-image img {
          transform: scale(1.05);
        }

        .favorite-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.8);
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-content {
          padding: 1.5rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .destination-name {
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
        }

        .destination-category {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 195, 0, 0.2);
          color: #FFC300;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .destination-description {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .destination-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-item {
          color: #cccccc;
          font-size: 0.9rem;
        }

        .info-item strong {
          color: #FFC300;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }
          
          .favorites-grid {
            grid-template-columns: 1fr;
          }
          
          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Favorites;