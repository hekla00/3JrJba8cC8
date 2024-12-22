import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders without crashing', () => {
    render(<Search onSearch={mockOnSearch} />);
  });

  //   Checking if the component displays the search input
  test('displays the search input', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search');
    expect(input).toBeInTheDocument();
  });

  //   Checking if onSearch is called with the query when the form is submitted
  test('calls onSearch with the query when the form is submitted', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.submit(input);
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});
