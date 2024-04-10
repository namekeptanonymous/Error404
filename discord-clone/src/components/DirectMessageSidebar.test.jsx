import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import DirectMessageSidebar from './DirectMessageSidebar';

// Mock child components to prevent their actual implementation from affecting these tests
vi.mock('./DirectMessageNavbar', () => ({
  __esModule: true,
  default: () => <div>DirectMessageNavbar Mock</div>,
}));
vi.mock('./DirectMessageSearch', () => ({
  __esModule: true,
  default: () => <div>DirectMessageSearch Mock</div>,
}));
vi.mock('./DirectMessageChats', () => ({
  __esModule: true,
  default: () => <div>DirectMessageChats Mock</div>,
}));

describe('DirectMessageSidebar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sidebar with all child components', () => {
    render(
      <BrowserRouter>
        <DirectMessageSidebar />
      </BrowserRouter>
    );
    
    expect(screen.getByText('DirectMessageNavbar Mock')).toBeInTheDocument();
    expect(screen.getByText('DirectMessageSearch Mock')).toBeInTheDocument();
    expect(screen.getByText('DirectMessageChats Mock')).toBeInTheDocument();
  });
});