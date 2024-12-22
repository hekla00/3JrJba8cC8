import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const observer = useRef();

  const ITEMS_PER_PAGE = 20;

  // Function to load the stories
  const loadStories = async (category, page = 1) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch the posts based on the category
      const { stories, total } = await fetchPosts(
        category,
        page,
        ITEMS_PER_PAGE
      );
      // Set the posts
      setPosts((prevPosts) =>
        page === 1 ? stories : [...prevPosts, ...stories]
      );
      // Set the total number of pages based on the total number of posts
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
      // Set loading to false when the posts are fetched
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Load the stories when the page loads
  useEffect(() => {
    setPosts([]);
    setCurrentPage(1);
    loadStories(activeCategory, 1);
  }, [activeCategory]);

  //   function to handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  //   Function to load more posts when the user scrolls to the bottom
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
          loadStories(activeCategory, currentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPage, totalPages, activeCategory]
  );

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
        <div ref={lastPostElementRef}></div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
