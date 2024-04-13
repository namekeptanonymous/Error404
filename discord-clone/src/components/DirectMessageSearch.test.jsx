import { render } from "@testing-library/react";
import { describe, it, vi } from 'vitest';
import DirectMessageSearch from './DirectMessageSearch';
import { BrowserRouter } from 'react-router-dom';
import { ChatContext } from "../context/ChatContext";

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn().mockReturnValue([{ uid: 'user_id', displayName: 'Test User', photoURL: 'test_url' }, false, undefined]),
}));

vi.mock('../firebase', () => ({
  auth: { signOut: vi.fn() },
  db: {},
}));

const chatContextValue = {
  dispatch: vi.fn(),
};

describe('DirectMessageSearch component', () => {
  it('renders without errors', () => {
    render(
      <ChatContext.Provider value={chatContextValue}>
        <BrowserRouter>
          <DirectMessageSearch />
        </BrowserRouter>
      </ChatContext.Provider>
    );
  });
});