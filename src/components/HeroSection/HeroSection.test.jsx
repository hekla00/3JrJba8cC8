import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

// Test cases
describe('HeroSection Component', () => {
  test('renders without crashing', () => {
    render(<HeroSection />);
  });

  test('displays the correct heading', () => {
    render(<HeroSection />);
    const heading = screen.getByText('Welcome to Hacker News');
    expect(heading).toBeInTheDocument();
  });
});
