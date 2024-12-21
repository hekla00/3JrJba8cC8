import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import Footer from './components/Footer/Footer';
import List from './components/List/List';
import { fetchPosts } from './api/fetchPosts';
import Segment from './components/Segment/Segment';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('top');

  // Function to load the stories
  const loadStories = async (category) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the posts based on the category
      const stories = await fetchPosts(category);
      setPosts(stories);
      // Set loading to false when the posts are fetched
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Load the stories when the page loads or the category changes
  useEffect(() => {
    loadStories(activeCategory);
  }, [activeCategory]);

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <HeroSection />
        <div className='mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-5 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'></div>
        <Segment
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        {/* Loading / Error State */}
        {loading && <p>Loading posts...</p>}
        {error && <p>{error}</p>}
        {/* Display the posts */}
        <List posts={posts} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
