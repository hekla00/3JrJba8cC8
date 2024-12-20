import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

export default function HomePage() {
  const [data, setData] = useState(null);
  // Fetching data from the Hacker News API to test connection
  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <HeroSection />
        <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {data && (
            <div>
              <h3 className='text-lg font-semibold'>{data.title}</h3>
              <p>{data.text}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
