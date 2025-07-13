import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import SwitzerlandDestinations from './pages/SwitzerlandDestinations';
import Blog from './pages/Blog';
import Favorites from './pages/Favorites';
import BucketList from './pages/BucketList';
import './App.css';

export interface Destination {
  id: string;
  name: string;
  category: string;
  images: string[];
  history: string;
  timings: string;
  entryFee: string;
  bestTimeToVisit: string;
}

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bucketList, setBucketList] = useState<string[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  const toggleFavorite = (destinationId: string) => {
    setFavorites(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const toggleBucketList = (destinationId: string) => {
    setBucketList(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const addBlogPost = (post: any) => {
    setBlogPosts(prev => [...prev, { ...post, id: Date.now().toString() }]);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route 
            path="/switzerland" 
            element={
              <SwitzerlandDestinations 
                favorites={favorites}
                bucketList={bucketList}
                onToggleFavorite={toggleFavorite}
                onToggleBucketList={toggleBucketList}
                onAddBlogPost={addBlogPost}
              />
            } 
          />
          <Route path="/blog" element={<Blog blogPosts={blogPosts} onAddBlogPost={addBlogPost} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
          <Route path="/bucket-list" element={<BucketList bucketList={bucketList} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;