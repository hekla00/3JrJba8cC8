import { ChatBubbleLeftIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function List({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  // Sets the number of items shown on the page
  const postsPerPage = 15;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  //   console.log(posts);
  return (
    <div>
      <ul className='divide-y divide-gray-100'>
        {currentPosts.map((post) => (
          <li
            key={post.id}
            className='flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap'
          >
            {/* Title */}
            <div className='flex-1 min-w-0 text-left'>
              <p className='text-sm/6 font-semibold text-gray-900'>
                <a href={post.url} className='hover:underline'>
                  {post.title}
                </a>
              </p>
              {/* Author */}
              <div className='mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500'>
                <p>
                  <a href={post.by} className='hover:underline'>
                    By {post.by}
                  </a>
                </p>
                {/* Dot */}
                <svg viewBox='0 0 2 2' className='size-0.5 fill-current'>
                  <circle r={1} cx={1} cy={1} />
                </svg>
                {/* Date & Time */}
                <p>
                  <time
                    dateTime={new Date(post.time * 1000).toISOString()}
                    className='text-gray-500'
                  >
                    {new Date(post.time * 1000).toLocaleDateString()}
                  </time>
                </p>
                {/* Dot */}
                <svg viewBox='0 0 2 2' className='size-0.5 fill-current'>
                  <circle r={1} cx={1} cy={1} />
                </svg>
                {/* Points */}
                <p>
                  <a href={post.score} className='hover:underline'>
                    {post.score} points
                  </a>
                </p>
              </div>
            </div>
            <dl className='flex w-full flex-none justify-between gap-x-8 sm:w-auto'>
              {/* Type */}
              <span
                className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${
                  post.type === 'story'
                    ? 'bg-orange-200 text-orange-800'
                    : post.type === 'job'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                {post.type}
              </span>
              {/* Comments */}
              <div className='flex w-16 gap-x-2.5'>
                <dt>
                  <span className='sr-only'>Total comments</span>
                  {post.type === 'job' ? (
                    <BriefcaseIcon
                      aria-hidden='true'
                      className='size-6 text-gray-400'
                    />
                  ) : (
                    <ChatBubbleLeftIcon
                      aria-hidden='true'
                      className='size-6 text-gray-400'
                    />
                  )}
                </dt>
                {/* Total comments */}
                <dd className='text-sm/6 text-gray-900'>{post.descendants}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
