import React, { useState, useEffect, useRef, useCallback } from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import Footer from './components/Footer/Footer';
import List from './components/List/List';
import { fetchPosts } from './api/fetchPosts';
import Segment from './components/Segment/Segment';
import Search from './components/Search/Search';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('top');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const observer = useRef();

  const ITEMS_PER_PAGE = 20;

  // Fetch stories data based on active category and pagination
  const loadStories = async (category, query = '', page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const { stories, total } = await fetchPosts(
        category,
        query,
        page,
        ITEMS_PER_PAGE
      );
      // Set the posts
      setPosts((prevPosts) => [...prevPosts, ...stories]);
      // Set the total number of pages based on the total number of posts
      setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
      // Set loading to false when the posts are fetched
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch stories whenever the category or page changes
  useEffect(() => {
    setPosts([]);
    setCurrentPage(1);
    loadStories(activeCategory, query, 1);
  }, [activeCategory, query]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (query) => {
    setQuery(query);
  };

  //   Function to load more posts when the user scrolls to the bottom
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
          loadStories(activeCategory, query, currentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, currentPage, totalPages, activeCategory, query]
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
        <Search onSearch={handleSearch} />
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
