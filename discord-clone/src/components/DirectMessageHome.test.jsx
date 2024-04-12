import { render, screen } from "@testing-library/react";
import { expect, describe, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import DirectMessageHome from './DirectMessageHome';
import DirectMessageSidebar from '../components/DirectMessageSidebar';
import DirectMessageChat from '../components/DirectMessageChat';

vi.mock('../components/DirectMessageSidebar', () => ({
  __esModule: true,
  default: () => <div>MockDirectMessageSidebar</div>,
}));

vi.mock('../components/DirectMessageChat', () => ({
  __esModule: true,
  default: () => <div>MockDirectMessageChat</div>,
}));

describe('DirectMessageHome component', () => {
  it('renders DirectMessageSidebar and DirectMessageChat components', () => {
    render(
      <BrowserRouter>
        <DirectMessageHome />
      </BrowserRouter>
    );
    
    const sidebar = screen.getByText('MockDirectMessageSidebar');
    const chat = screen.getByText('MockDirectMessageChat');
    
    expect(sidebar).toBeInTheDocument();
    expect(chat).toBeInTheDocument();
  });
});