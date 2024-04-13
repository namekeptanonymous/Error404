import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import DirectMessageChats from './DirectMessageChats';
import { ChatContext } from "../context/ChatContext";
import { useAuthState } from 'react-firebase-hooks/auth';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

describe('DirectMessageChats component', () => {
  const mockDispatch = vi.fn();
  
  const mockChatsState = {
    chats: {
      chatId1: {
        userInfo: { uid: 'user2', name: 'Jane Doe', photoURL: 'url_to_photo' },
        lastMessage: { text: 'Hello Jane' }
      }
    },
    user: {
      uid: 'user1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      photoURL: 'url_to_john_photo'
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthState).mockReturnValue([{ uid: 'user1' }, false, undefined]);
  });

  it('does not render chats when user is logged out', () => {
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    render(
      <BrowserRouter>
        <ChatContext.Provider value={{ data: { chats: {} }, dispatch: mockDispatch }}>
          <DirectMessageChats />
        </ChatContext.Provider>
      </BrowserRouter>
    );

    const chatElements = screen.queryByRole('listitem');
    expect(chatElements).toBeNull();
  });
  
});