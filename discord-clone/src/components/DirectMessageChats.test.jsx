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
  
  // Assuming a default mock chats state
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
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Provide the default implementation for useAuthState that returns a user
    vi.mocked(useAuthState).mockReturnValue([{ uid: 'user1' }, false, undefined]);
  });

  

  it('does not render chats when user is logged out', () => {
    // Provide an implementation for useAuthState that returns null for the user
    vi.mocked(useAuthState).mockReturnValue([null, false, undefined]);

    render(
      <BrowserRouter>
        <ChatContext.Provider value={{ data: { chats: {} }, dispatch: mockDispatch }}>
          <DirectMessageChats />
        </ChatContext.Provider>
      </BrowserRouter>
    );

    // Assuming that chats render a list item for each chat
    const chatElements = screen.queryByRole('listitem');
    expect(chatElements).toBeNull();
  });

  
});