import { render, screen } from "@testing-library/react";
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from './Header';

vi.mock('react-firebase-hooks/auth');

describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('renders "Open ChatterBox" button when user is logged in', async () => {
    useAuthState.mockReturnValue([true]);
    render(<Header />, { wrapper: BrowserRouter });
    
    const openChatterBoxButton = await screen.findByRole('button', { name: "Open ChatterBox" });
    expect(openChatterBoxButton).toBeInTheDocument();
  });
  it('renders "Login" button when user is logged out', async () => {
    useAuthState.mockReturnValue([false]);
    render(<Header />, { wrapper: BrowserRouter });

    const loginButton = await screen.findByRole('button', { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });
});


test('renders ChatterBox logo', () => {
  render(<Header />, { wrapper: BrowserRouter });

  const logoElement = screen.getByAltText('ChatterBox Logo');
  expect(logoElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<Header />, { wrapper: BrowserRouter });

  const downloadLink = screen.getByText('Download');
  expect(downloadLink).toBeInTheDocument();

  const whyLink = screen.getByText('Why ChatterBox?');
  expect(whyLink).toBeInTheDocument();

  const premiumLink = screen.getByText('Premium');
  expect(premiumLink).toBeInTheDocument();

  const safetyLink = screen.getByText('Safety');
  expect(safetyLink).toBeInTheDocument();

  const supportLink = screen.getByText('Support');
  expect(supportLink).toBeInTheDocument();
});



test('hides certain elements on smaller screens', () => {
  global.innerWidth = 600;
  render(<Header />, { wrapper: BrowserRouter });

  const navigationLinks = screen.queryByRole('navigation');
  expect(navigationLinks).toBeNull();
});