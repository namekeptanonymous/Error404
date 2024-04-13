import { render } from "@testing-library/react";
import { describe, it, vi, beforeEach } from 'vitest';
import DirectMessageNavbar from './DirectMessageNavbar';
import { BrowserRouter } from 'react-router-dom';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn().mockReturnValue([{ displayName: 'Test User', photoURL: 'test_url' }, false, undefined]),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
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
  });
});