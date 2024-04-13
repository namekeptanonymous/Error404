import React from 'react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DirectMessageInput from './DirectMessageInput';
import { ChatContext } from '../context/ChatContext';
import { useAuthState } from 'react-firebase-hooks/auth';
vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));
vi.mock('../firebase', () => ({
  db: {
    doc: vi.fn(),
    updateDoc: vi.fn(),
  },
  auth: {},
}));

const renderWithChatContext = (ui, { providerProps }) => {
  return render(
    <ChatContext.Provider value={providerProps}>{ui}</ChatContext.Provider>
  );
};

describe('DirectMessageInput', () => {
  beforeEach(() => {
    vi.mocked(useAuthState).mockReturnValue([{ uid: 'test-uid' }, false, null]);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const providerProps = {
      data: { chatId: 'test-chat-id' },
      dispatch: vi.fn(),
    };
    renderWithChatContext(<DirectMessageInput />, { providerProps });
    expect(screen.getByPlaceholderText('Type something...')).toBeDefined();
  });

  it('should update the text state on input change', () => {
    const providerProps = {
      data: { chatId: 'test-chat-id' },
      dispatch: vi.fn(),
    };
    renderWithChatContext(<DirectMessageInput />, { providerProps });
    const inputElement = screen.getByPlaceholderText('Type something...');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(inputElement.value).toBe('Hello');
  });
});