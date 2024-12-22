import React from 'react';

function Segment({ activeCategory, onCategoryChange }) {
  return (
    <div className='flex justify-center'>
      <div className='flex space-x-4 mb-8'>
        {/* Top Posts */}
        <button
          onClick={() => onCategoryChange('top')}
          className={`px-4 py-2 text-lg font-medium rounded-md ${
            activeCategory === 'top'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          Top Posts
        </button>
        {/* New Posts */}
        <button
          onClick={() => onCategoryChange('new')}
          className={`px-4 py-2 text-lg font-medium rounded-md ${
            activeCategory === 'new'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          New Posts
        </button>
      </div>
    </div>
  );
}

export default Segment;
