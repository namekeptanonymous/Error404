import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import DirectMessageMessage from './DirectMessageMessage';
import { ChatContext } from '../context/ChatContext';
import { useAuthState } from 'react-firebase-hooks/auth';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));
vi.mock('../firebase', () => ({
  auth: {
    currentUser: {
      uid: 'user123',
      photoURL: 'currentUserPhotoUrl.jpg',
    },
  },
}));

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('<DirectMessageMessage />', () => {
  beforeEach(() => {
    vi.mocked(useAuthState).mockReturnValue([{ uid: 'user123', photoURL: 'currentUserPhotoUrl.jpg' }, false, null]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the message and calls scrollIntoView', () => {
    const providerProps = {
      data: {
        user: {
          photoURL: 'otherUserPhotoUrl.jpg',
        },
      },
      dispatch: vi.fn(),
    };
    const message = {
      senderId: 'user123',
      text: 'Hello World',
    };

    render(
      <ChatContext.Provider value={providerProps}>
        <DirectMessageMessage message={message} />
      </ChatContext.Provider>
    );

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });
});