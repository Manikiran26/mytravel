import React from 'react';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { switzerlandDestinations } from '../data/switzerlandDestinations';

interface Props {
  bucketList: string[];
}

const BucketList: React.FC<Props> = ({ bucketList }) => {
  const bucketListDestinations = switzerlandDestinations.filter(dest => 
    bucketList.includes(dest.id)
  );

  return (
    <div className="bucket-list-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Your Bucket List</h1>
          <p>Dream destinations waiting to be explored</p>
        </div>

        {bucketListDestinations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-content">
              <MapPin size={64} className="empty-icon" />
              <h3>Your bucket list is empty</h3>
              <p>Add destinations you want to visit to start planning your Swiss adventure!</p>
            </div>
          </div>
        ) : (
          <div className="bucket-list-grid">
            {bucketListDestinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="bucket-item card slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="item-image">
                  <img 
                    src={destination.images[0]}
                    alt={destination.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop';
                    }}
                  />
                  <div className="bucket-badge">
                    <MapPin size={18} fill="#FFC300" color="#FFC300" />
                  </div>
                </div>
                <div className="item-content">
                  <div className="item-header">
                    <h3 className="destination-name">{destination.name}</h3>
                    <span className="destination-category">{destination.category}</span>
                  </div>
                  
                  <p className="destination-description">
                    {destination.history.substring(0, 100)}...
                  </p>
                  
                  <div className="planning-info">
                    <div className="info-row">
                      <Calendar size={16} />
                      <div>
                        <strong>Best time to visit:</strong>
                        <span>{destination.bestTimeToVisit}</span>
                      </div>
                    </div>
                    <div className="info-row">
                      <DollarSign size={16} />
                      <div>
                        <strong>Entry fee:</strong>
                        <span>{destination.entryFee}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="progress-indicator">
                    <div className="progress-label">Planning Progress</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '25%' }}></div>
                    </div>
                    <div className="progress-text">Ready to plan</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {bucketListDestinations.length > 0 && (
          <div className="bucket-summary">
            <div className="summary-card card">
              <h3>Your Swiss Adventure Summary</h3>
              <div className="summary-stats">
                <div className="stat">
                  <span className="stat-number">{bucketListDestinations.length}</span>
                  <span className="stat-label">Destinations</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {bucketListDestinations.filter(d => d.category.includes('Mountain')).length}
                  </span>
                  <span className="stat-label">Mountain Adventures</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {bucketListDestinations.filter(d => d.category.includes('City')).length}
                  </span>
                  <span className="stat-label">City Explorations</span>
                </div>
              </div>
              <p className="summary-text">
                Your bucket list is shaping up to be an incredible Swiss journey! 
                Start planning your visits during the recommended seasons for the best experience.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .bucket-list-page {
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

        .bucket-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .bucket-item {
          overflow: hidden;
        }

        .item-image {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .bucket-item:hover .item-image img {
          transform: scale(1.05);
        }

        .bucket-badge {
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

        .item-content {
          padding: 1.5rem;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .destination-name {
          color: #ffffff;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
        }

        .destination-category {
          background: rgba(255, 195, 0, 0.2);
          color: #FFC300;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .destination-description {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .planning-info {
          margin-bottom: 1.5rem;
        }

        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .info-row svg {
          color: #FFC300;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .info-row div {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-row strong {
          color: #FFC300;
          font-size: 0.9rem;
        }

        .info-row span {
          color: #cccccc;
          font-size: 0.9rem;
        }

        .progress-indicator {
          border-top: 1px solid #333;
          padding-top: 1rem;
        }

        .progress-label {
          color: #FFC300;
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .progress-bar {
          background: #333;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          background: linear-gradient(90deg, #FFC300, #FFD700);
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-text {
          color: #999;
          font-size: 0.8rem;
        }

        .bucket-summary {
          margin-top: 3rem;
        }

        .summary-card {
          padding: 2rem;
          text-align: center;
        }

        .summary-card h3 {
          color: #FFC300;
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #FFC300;
          font-family: 'Poppins', sans-serif;
        }

        .stat-label {
          color: #cccccc;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .summary-text {
          color: #cccccc;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }
          
          .bucket-list-grid {
            grid-template-columns: 1fr;
          }
          
          .item-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .summary-stats {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BucketList;