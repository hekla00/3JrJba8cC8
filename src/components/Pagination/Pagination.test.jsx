import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  //   Checking if the component renders without crashing
  test('renders without crashing', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
  });

  //   Checking if the component displays the correct number of page buttons
  test('displays the correct number of page buttons', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons.length).toBe(7); // 5 page buttons + 2 navigation buttons (Previous, Next)
  });

  //   Checking if the component displays the correct page numbers
  test('displays the correct page numbers', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  //   Checking if the component calls onPageChange with the correct page number when a page button is clicked
  test('calls onPageChange with the correct page number when a page button is clicked', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  //   Checking if the component calls onPageChange with the previous page number when Previous button is clicked
  test('calls onPageChange with the previous page number when Previous button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  //   Checking if the Previous button is disabled on the first page
  test('disables the Previous button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  //   Checking if the Next button is disabled on the last page
  test('disables the Next button on the last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });
});
