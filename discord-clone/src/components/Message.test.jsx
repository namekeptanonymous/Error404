import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Message from './Message';
import '@testing-library/jest-dom';

vi.mock('moment', () => ({
  default: () => ({
    format: () => 'Jan 1, 2023',
  }),
  __esModule: true,
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn().mockImplementation(() => 'channel1'),
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn().mockReturnValue([{ email: 'user@example.com' }, false, undefined]),
}));

vi.mock('react-firebase-hooks/firestore', () => ({
  useCollection: vi.fn().mockReturnValue([
    {
      docs: [{ id: 'admin1', data: () => ({ email: 'user@example.com' }) }],
    },
    false,
    undefined,
  ]),
}));

vi.mock('@firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  deleteDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
}));

const mockMessage = {
  id: '1',
  message: 'Test message',
  timestamp: { toDate: () => new Date('2023-01-01T00:00:00.000Z') },
  name: 'Test User',
  email: 'user@example.com',
  photoURL: 'https://example.com/photo.jpg',
};

describe('Message Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders message correctly', () => {
    render(<Message {...mockMessage} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText(/Jan 1, 2023/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockMessage.photoURL);
  });
});