import { render, screen } from "@testing-library/react";
import { expect, describe, it, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import DirectMessageMessages from './DirectMessageMessages';
import { ChatContext } from "../context/ChatContext";

vi.mock("../firebase", () => ({
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(),
  onSnapshot: vi.fn((docRef, callback) => {
    callback({
      exists: () => true,
      data: () => ({
        messages: [
          { id: 'm1', text: 'Hello there!' },
          { id: 'm2', text: 'General Kenobi!' },
        ],
      }),
    });
    return () => {};
  }),
}));

vi.mock('./DirectMessageMessage', () => ({
  __esModule: true,
  default: ({ message }) => <div data-testid="message">{message.text}</div>,
}));

describe('DirectMessageMessages component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders messages from the context', () => {
    const mockData = { chatId: 'chat1' };

    render(
      <ChatContext.Provider value={{ data: mockData }}>
        <DirectMessageMessages />
      </ChatContext.Provider>
    );

    const messageElements = screen.getAllByTestId('message');
    expect(messageElements.length).toBeGreaterThan(0);
    expect(messageElements[0]).toHaveTextContent('Hello there!');
    expect(messageElements[1]).toHaveTextContent('General Kenobi!');
  });
});