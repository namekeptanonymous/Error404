import { render, screen } from "@testing-library/react";
import { expect, describe, it, beforeEach, vi } from 'vitest';
import DirectMessageChat from './DirectMessageChat';
import { ChatContext } from "../context/ChatContext";

const mockContext = {
  data: {
    user: null,
  }
};

describe('DirectMessageChat component', () => {
  beforeEach(() => {
    mockContext.data.user = null;
  });

  it('does not render chat elements when no user is selected', () => {
    render(
      <ChatContext.Provider value={mockContext}>
        <DirectMessageChat />
      </ChatContext.Provider>
    );
    
    const chatElement = screen.queryByRole('article');
    expect(chatElement).toBeNull();
  });

  
});