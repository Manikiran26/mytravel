import React, { useState } from 'react';
import { Heart, MapPin, Clock, DollarSign, Calendar, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { switzerlandDestinations } from '../data/switzerlandDestinations';
import { Destination } from '../App';

interface Props {
  favorites: string[];
  bucketList: string[];
  onToggleFavorite: (id: string) => void;
  onToggleBucketList: (id: string) => void;
  onAddBlogPost: (post: any) => void;
}

const SwitzerlandDestinations: React.FC<Props> = ({
  favorites,
  bucketList,
  onToggleFavorite,
  onToggleBucketList,
  onAddBlogPost
}) => {
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [showBlogModal, setShowBlogModal] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');

  const nextImage = (destinationId: string, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [destinationId]: ((prev[destinationId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (destinationId: string, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [destinationId]: ((prev[destinationId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const getCurrentImageIndex = (destinationId: string) => {
    return imageIndexes[destinationId] || 0;
  };

  const handleBlogSubmit = (destinationName: string) => {
    if (blogTitle.trim() && blogContent.trim()) {
      onAddBlogPost({
        title: blogTitle,
        content: blogContent,
        destination: destinationName,
        date: new Date().toLocaleDateString(),
        tags: ['Switzerland', destinationName]
      });
      setBlogTitle('');
      setBlogContent('');
      setShowBlogModal(null);
    }
  };

  return (
    <div className="destinations-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Switzerland Destinations</h1>
          <p>Discover 29 breathtaking destinations in the heart of the Alps</p>
        </div>

        <div className="destinations-grid">
          {switzerlandDestinations.map((destination, index) => {
            const currentImageIndex = getCurrentImageIndex(destination.id);
            const isFavorite = favorites.includes(destination.id);
            const isInBucketList = bucketList.includes(destination.id);

            return (
              <div 
                key={destination.id} 
                className="destination-card card slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-image-container">
                  <img 
                    src={destination.images[currentImageIndex]}
                    alt={destination.name}
                    className="destination-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';
                    }}
                  />
                  <div className="image-navigation">
                    <button 
                      className="nav-btn prev-btn"
                      onClick={() => prevImage(destination.id, destination.images.length)}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      className="nav-btn next-btn"
                      onClick={() => nextImage(destination.id, destination.images.length)}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="image-indicators">
                    {destination.images.map((_, imgIndex) => (
                      <div 
                        key={imgIndex}
                        className={`indicator ${imgIndex === currentImageIndex ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                  <div className="card-category">
                    <MapPin size={14} />
                    {destination.category}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="destination-name">{destination.name}</h3>
                  
                  <p className="destination-history">{destination.history}</p>
                  
                  <div className="destination-details">
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{destination.timings}</span>
                    </div>
                    <div className="detail-item">
                      <DollarSign size={16} />
                      <span>{destination.entryFee}</span>
                    </div>
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>{destination.bestTimeToVisit}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button 
                      className={`action-btn ${isFavorite ? 'active' : ''}`}
                      onClick={() => onToggleFavorite(destination.id)}
                    >
                      <Heart size={18} fill={isFavorite ? '#FFC300' : 'none'} />
                      Favorite
                    </button>
                    <button 
                      className={`action-btn ${isInBucketList ? 'active' : ''}`}
                      onClick={() => onToggleBucketList(destination.id)}
                    >
                      <MapPin size={18} fill={isInBucketList ? '#FFC300' : 'none'} />
                      Bucket List
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => setShowBlogModal(destination.id)}
                    >
                      <MessageSquare size={18} />
                      Write Blog
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="modal-overlay" onClick={() => setShowBlogModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Write a Blog Post</h3>
            <p>Share your experience about {switzerlandDestinations.find(d => d.id === showBlogModal)?.name}</p>
            
            <input
              type="text"
              placeholder="Blog title..."
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="blog-input"
            />
            
            <textarea
              placeholder="Share your thoughts, experiences, and tips..."
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="blog-textarea"
              rows={8}
            />
            
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setShowBlogModal(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={() => handleBlogSubmit(switzerlandDestinations.find(d => d.id === showBlogModal)?.name || '')}
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .destinations-page {
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

        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .destination-card {
          overflow: hidden;
        }

        .card-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .destination-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .destination-card:hover .destination-image {
          transform: scale(1.05);
        }

        .image-navigation {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .destination-card:hover .image-navigation {
          opacity: 1;
        }

        .nav-btn {
          background: rgba(0, 0, 0, 0.7);
          color: #FFC300;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: rgba(255, 195, 0, 0.9);
          color: #000000;
        }

        .image-indicators {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: background 0.3s ease;
        }

        .indicator.active {
          background: #FFC300;
        }

        .card-category {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.8);
          color: #FFC300;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .destination-name {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .destination-history {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .destination-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #cccccc;
          font-size: 0.9rem;
        }

        .detail-item svg {
          color: #FFC300;
          flex-shrink: 0;
        }

        .card-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: 1px solid #333;
          background: transparent;
          color: #cccccc;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          min-width: 110px;
          justify-content: center;
        }

        .action-btn:hover {
          border-color: #FFC300;
          color: #FFC300;
        }

        .action-btn.active {
          border-color: #FFC300;
          color: #FFC300;
          background: rgba(255, 195, 0, 0.1);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-content h3 {
          color: #FFC300;
          margin-bottom: 0.5rem;
        }

        .modal-content p {
          color: #cccccc;
          margin-bottom: 1.5rem;
        }

        .blog-input, .blog-textarea {
          width: 100%;
          background: #333;
          border: 1px solid #555;
          border-radius: 8px;
          padding: 1rem;
          color: #ffffff;
          font-family: inherit;
          margin-bottom: 1rem;
          resize: vertical;
        }

        .blog-input:focus, .blog-textarea:focus {
          outline: none;
          border-color: #FFC300;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1.5rem;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }
          
          .destinations-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .card-actions {
            flex-direction: column;
          }
          
          .action-btn {
            min-width: auto;
          }
          
          .modal-overlay {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SwitzerlandDestinations;