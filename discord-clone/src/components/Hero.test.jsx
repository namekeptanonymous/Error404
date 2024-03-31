import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Hero from './Hero'; // Ensure this path is correct based on your project structure

describe('Hero component', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it('renders the main heading correctly', () => {
    const mainHeading = screen.getByRole('heading', { name: /your place to yap/i });
    expect(mainHeading).toBeInTheDocument();
  });

  it('renders the secondary heading correctly', () => {
    const secondaryHeading = screen.getByText(/whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, chatterbox makes it easy to talk every day and hang out more often./i);
    expect(secondaryHeading).toBeInTheDocument();
  });

  it('renders the download button with correct text', () => {
    const downloadButton = screen.getByRole('button', { name: /download \(currently unavailable\)/i });
    expect(downloadButton).toBeInTheDocument();
  });

  it('renders the "Open ChatterBox in your browser" button', () => {
    const openChatterBoxButton = screen.getByRole('button', { name: /open chatterbox in your browser/i });
    expect(openChatterBoxButton).toBeInTheDocument();
  });

});