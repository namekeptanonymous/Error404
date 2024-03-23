import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from './Header';


test('renders header with login button', () => {
    render(<Header />, { wrapper: BrowserRouter })

  // Check if the ChatterBox logo is displayed
  const logoElement = screen.getByAltText('ChatterBox Logo');
  expect(logoElement).toBeInTheDocument();

  // Check if the login button is displayed
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
});