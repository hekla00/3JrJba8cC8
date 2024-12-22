import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

// Checking if the Footer component renders without crashing
describe('Footer Component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
  });

  //   Checking if the Footer component displays all navigation links
  test('displays all navigation links', () => {
    render(<Footer />);
    const links = [
      'Guidelines',
      'FAQ',
      'Lists',
      'API',
      'Security',
      'Legal',
      'Apply to YC',
      'Contact',
    ];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  test('navigation links have correct href attributes', () => {
    render(<Footer />);
    expect(screen.getByText('Guidelines')).toHaveAttribute(
      'href',
      'https://news.ycombinator.com/newsguidelines.html'
    );
    expect(screen.getByText('FAQ')).toHaveAttribute(
      'href',
      'https://news.ycombinator.com/newsfaq.html'
    );
    expect(screen.getByText('Lists')).toHaveAttribute(
      'href',
      'https://news.ycombinator.com/lists'
    );
    expect(screen.getByText('API')).toHaveAttribute(
      'href',
      'https://github.com/HackerNews/API'
    );
    expect(screen.getByText('Security')).toHaveAttribute(
      'href',
      'https://news.ycombinator.com/security.html'
    );
    expect(screen.getByText('Legal')).toHaveAttribute(
      'href',
      'https://www.ycombinator.com/legal/'
    );
    expect(screen.getByText('Apply to YC')).toHaveAttribute(
      'href',
      'https://www.ycombinator.com/apply/'
    );
    expect(screen.getByText('Contact')).toHaveAttribute(
      'href',
      'mailto:hn@ycombinator.com'
    );
  });

  //   Checking if the Footer component displays the correct copyright text
  test('displays the copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(
      /© 2024 Hacker News, Inc. All rights reserved./i
    );
    expect(copyrightText).toBeInTheDocument();
  });
});
