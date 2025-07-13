import React, { useState } from 'react';
import { Calendar, User, MapPin, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  destination: string;
  date: string;
  tags: string[];
}

interface Props {
  blogPosts: BlogPost[];
  onAddBlogPost: (post: any) => void;
}

const Blog: React.FC<Props> = ({ blogPosts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="blog-page">
      <div className="container">
        <div className="page-header fade-in">
          <h1>Travel Blog</h1>
          <p>Share your Switzerland adventures and discover stories from fellow travelers</p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-content">
              <h3>No blog posts yet</h3>
              <p>Start your travel journal by writing about your favorite Swiss destinations. Visit the Switzerland destinations page and click "Write Blog" on any location card to get started!</p>
            </div>
          </div>
        ) : (
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="blog-card card slide-in"
                onClick={() => setSelectedPost(post)}
              >
                <div className="blog-card-content">
                  <h3 className="blog-title">{post.title}</h3>
                  <div className="blog-meta">
                    <div className="meta-item">
                      <MapPin size={14} />
                      <span>{post.destination}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <p className="blog-excerpt">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 ? '...' : ''}
                  </p>
                  <div className="blog-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Blog Post Modal */}
        {selectedPost && (
          <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
            <div className="modal-content blog-modal" onClick={(e) => e.stopPropagation()}>
              <div className="blog-header">
                <h2>{selectedPost.title}</h2>
                <div className="blog-meta">
                  <div className="meta-item">
                    <User size={16} />
                    <span>Traveler</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{selectedPost.destination}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{selectedPost.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="blog-content">
                {selectedPost.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <div className="blog-tags">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-primary" 
                  onClick={() => setSelectedPost(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .blog-page {
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
          max-width: 600px;
          margin: 0 auto;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .empty-content {
          text-align: center;
          max-width: 500px;
          padding: 2rem;
          border: 2px dashed #333;
          border-radius: 12px;
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

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .blog-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-4px);
        }

        .blog-card-content {
          padding: 1.5rem;
        }

        .blog-title {
          color: #FFC300;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .blog-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #999;
          font-size: 0.9rem;
        }

        .meta-item svg {
          color: #FFC300;
        }

        .blog-excerpt {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .blog-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(255, 195, 0, 0.2);
          color: #FFC300;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .blog-modal {
          max-width: 700px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .blog-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid #333;
          padding-bottom: 1rem;
        }

        .blog-header h2 {
          color: #FFC300;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .blog-content {
          margin-bottom: 2rem;
        }

        .blog-content p {
          color: #cccccc;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }
          
          .blog-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-overlay {
            padding: 1rem;
          }
          
          .blog-modal {
            max-height: 90vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;