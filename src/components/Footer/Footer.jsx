import React from 'react';

const navigation = {
  main: [
    {
      name: 'Guidelines',
      href: 'https://news.ycombinator.com/newsguidelines.html',
    },
    { name: 'FAQ', href: 'https://news.ycombinator.com/newsfaq.html' },
    { name: 'Lists', href: 'https://news.ycombinator.com/lists' },
    { name: 'API', href: 'https://github.com/HackerNews/API' },
    { name: 'Security', href: 'https://news.ycombinator.com/security.html' },
    { name: 'Legal', href: 'https://www.ycombinator.com/legal/' },
    { name: 'Apply to YC', href: 'https://www.ycombinator.com/apply/' },
    { name: 'Contact', href: 'mailto:hn@ycombinator.com' },
  ],
};

export default function Footer() {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8'>
        <nav
          aria-label='Footer'
          className='-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6'
        >
          {navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-gray-600 hover:text-gray-900'
            >
              {item.name}
            </a>
          ))}
        </nav>
        <p className='mt-10 text-center text-sm/6 text-gray-600'>
          &copy; 2024 Hacker News, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
