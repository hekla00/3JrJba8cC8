import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Clear the search results
  };

  return (
    <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
      <form onSubmit={handleSearch} className='relative flex-1'>
        <input
          name='search'
          placeholder='Search'
          aria-label='Search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='block w-full bg-transparent pl-8 pr-8 text-base text-gray-900 outline-none placeholder:text-gray-900 sm:text-sm'
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }} // Hide the browser's built-in clear button
        />
        <MagnifyingGlassIcon
          aria-hidden='true'
          className='absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-800'
        />
        {query && (
          <XMarkIcon
            aria-hidden='true'
            className='absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-800 cursor-pointer'
            onClick={handleClear}
          />
        )}
      </form>
    </div>
  );
}
