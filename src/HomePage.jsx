import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import Footer from './components/Footer/Footer';
import List from './components/List/List';
import { fetchPosts } from './api/fetchPosts';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStories = async () => {
    setLoading(true);
    setError(null);

    try {
      const stories = await fetchPosts();
      setPosts(stories);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <HeroSection />
        <div className='mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-5 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'></div>
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
