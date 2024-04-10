import { render, screen } from "@testing-library/react";
import { expect, describe, it, beforeEach, vi } from 'vitest';
import DirectMessageChat from './DirectMessageChat';
import { ChatContext } from "../context/ChatContext";

// Mocking the ChatContext to provide test values
const mockContext = {
  data: {
    user: null, // or provide a mock user object for logged-in state
  }
};

describe('DirectMessageChat component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockContext.data.user = null;
  });

  it('does not render chat elements when no user is selected', () => {
    render(
      <ChatContext.Provider value={mockContext}>
        <DirectMessageChat />
      </ChatContext.Provider>
    );
    
    const chatElement = screen.queryByRole('article'); // assuming 'chat' role is an 'article'
    expect(chatElement).toBeNull();
  });

  
});