import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';

// Mock posts data
const mockPosts = [
  {
    id: 1,
    title: 'Post 1',
    url: 'https://example.com/post1',
    by: 'author1',
    time: 1633024800,
    score: 100,
    descendants: 50,
    type: 'story',
  },
  {
    id: 2,
    title: 'Post 2',
    url: 'https://example.com/post2',
    by: 'author2',
    time: 1633024800,
    score: 200,
    descendants: 30,
    type: 'job',
  },
];

// Test cases
describe('List Component', () => {
  test('renders without crashing', () => {
    render(<List posts={[]} />);
  });

  // Test cases for displaying post details
  test('displays post titles correctly', () => {
    render(<List posts={mockPosts} />);
    const postTitle1 = screen.getByText('Post 1');
    const postTitle2 = screen.getByText('Post 2');
    expect(postTitle1).toBeInTheDocument();
    expect(postTitle2).toBeInTheDocument();
  });

  test('displays post authors correctly', () => {
    render(<List posts={mockPosts} />);
    const postAuthor1 = screen.getByText('By author1');
    const postAuthor2 = screen.getByText('By author2');
    expect(postAuthor1).toBeInTheDocument();
    expect(postAuthor2).toBeInTheDocument();
  });

  test('displays post types correctly', () => {
    render(<List posts={mockPosts} />);
    const postType1 = screen.getByText('story');
    const postType2 = screen.getByText('job');
    expect(postType1).toBeInTheDocument();
    expect(postType2).toBeInTheDocument();
  });
});
