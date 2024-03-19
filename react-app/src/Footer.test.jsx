// Footer.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer.jsx'; // Adjust the import path as necessary

describe('Footer Component', () => {
  it('renders the Footer content correctly', () => {
    render(<Footer />);

    // Check for the presence of the text within the Footer component
    expect(screen.getByText(/Work done by the Error404 team. All rights reserved./i)).toBeInTheDocument();
  });
});
