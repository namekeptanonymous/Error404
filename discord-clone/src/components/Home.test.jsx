// Home.test.jsx

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

// Mock setups remain unchanged

describe('Home Component', () => {
  it('renders without crashing and displays static content', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Verify static content
    expect(screen.getByText(/Welcome to Your Dashboard/i)).toBeInTheDocument();
  });
});
