import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Segment from './Segment';

describe('Segment Component', () => {
  // Mock function
  const mockOnCategoryChange = jest.fn();

  //   Checking if the Segment component renders without crashing
  test('renders without crashing', () => {
    render(
      <Segment activeCategory='top' onCategoryChange={mockOnCategoryChange} />
    );
  });

  //   Checking if the Segment component displays Top Posts and New Posts buttons
  test('displays Top Posts and New Posts buttons', () => {
    render(
      <Segment activeCategory='top' onCategoryChange={mockOnCategoryChange} />
    );
    const topPostsButton = screen.getByText('Top Posts');
    const newPostsButton = screen.getByText('New Posts');
    expect(topPostsButton).toBeInTheDocument();
    expect(newPostsButton).toBeInTheDocument();
  });

  //   Checking if the Segment component applies active class to the Top Posts button when activeCategory is top
  test('applies active class to the Top Posts button when activeCategory is top', () => {
    render(
      <Segment activeCategory='top' onCategoryChange={mockOnCategoryChange} />
    );
    const topPostsButton = screen.getByText('Top Posts');
    expect(topPostsButton).toHaveClass('bg-gray-900 text-white');
  });

  //   Checking if the Segment component applies active class to the New Posts button when activeCategory is new
  test('calls onCategoryChange with "top" when Top Posts button is clicked', () => {
    render(
      <Segment activeCategory='new' onCategoryChange={mockOnCategoryChange} />
    );
    const topPostsButton = screen.getByText('Top Posts');
    fireEvent.click(topPostsButton);
    expect(mockOnCategoryChange).toHaveBeenCalledWith('top');
  });

  //   Checking if the Segment component applies active class to the New Posts button when activeCategory is new
  test('calls onCategoryChange with "new" when New Posts button is clicked', () => {
    render(
      <Segment activeCategory='top' onCategoryChange={mockOnCategoryChange} />
    );
    const newPostsButton = screen.getByText('New Posts');
    fireEvent.click(newPostsButton);
    expect(mockOnCategoryChange).toHaveBeenCalledWith('new');
  });
});
