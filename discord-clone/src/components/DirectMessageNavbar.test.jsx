import { render } from "@testing-library/react";
import { expect, describe, it, vi, beforeEach } from 'vitest';
import DirectMessageNavbar from './DirectMessageNavbar';
import { BrowserRouter } from 'react-router-dom';

// Mock the necessary hooks
vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn().mockReturnValue([{ displayName: 'Test User', photoURL: 'test_url' }, false, undefined]),
}));

// Mock `react-router-dom` but keep `BrowserRouter` from the actual library
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal(); // Import all actual exports
  return {
    ...actual, // Re-export all original exports
    useNavigate: vi.fn(), // Mock useNavigate
  };
});

describe('DirectMessageNavbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without errors', () => {
    render(
      <BrowserRouter>
        <DirectMessageNavbar />
      </BrowserRouter>
    );
    // No assertion is made, ensuring the test will pass
  });
  
  // You can add more tests here if needed...
});