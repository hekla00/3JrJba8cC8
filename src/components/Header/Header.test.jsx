import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
// Since jest is not able to handle image imports, we need to mock the image import by creating a file called __mocks__ and then creating a file called fileMock.js inside it.

// Checking if the Header component renders without crashing
describe('Header Component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

  //   Checking if the logo and title are displayed
  test('displays the Hacker News logo and title', () => {
    render(<Header />);
    const logo = screen.getByAltText('Hacker News');
    const title = screen.getByText('Hacker News');
    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  //   Checking if the mobile menu opens and closes
  test('opens and closes the mobile menu', () => {
    render(<Header />);
    const openButton = screen.getByRole('button', { name: /open main menu/i });
    fireEvent.click(openButton);
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  //   Checking if the Log in link navigates to the login page
  test('navigates to the login page when Log in is clicked', () => {
    render(<Header />);
    const loginLink = screen.getAllByText('Log in')[0];
    expect(loginLink).toHaveAttribute(
      'href',
      'https://news.ycombinator.com/login?goto=jobs'
    );
  });

  //   Checking if the logo navigates to the home page
  test('navigates to the home page when the logo is clicked', () => {
    render(<Header />);
    const logoButton = screen.getAllByRole('button', {
      name: /hacker news/i,
    })[0];
    fireEvent.click(logoButton);
    expect(window.location.href).toBe('http://localhost/');
  });
});
