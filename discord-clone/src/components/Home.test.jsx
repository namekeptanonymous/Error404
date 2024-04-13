import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './Home';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import channelReducer from '../features/channelSlice';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: vi.fn(() => vi.fn()),
  };
});
vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));
vi.mock('react-firebase-hooks/firestore', () => ({
  useCollection: vi.fn(),
}));

const mockStore = createStore(channelReducer, {
  channel: {
    channelId: null,
    channelName: null,
  },
});

const renderWithProviders = (ui, { route = '/', store = mockStore } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </Provider>
  );
};

describe('Home Component', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
      vi.mock('react-router-dom', async () => {
        const originalModule = await vi.importActual('react-router-dom');
        return {
          ...originalModule,
          useNavigate: vi.fn(() => vi.fn()),
        };
      });
    });
  
    it('renders without crashing when user is authenticated', async () => {
      useAuthState.mockReturnValue([{ displayName: 'Test User', uid: '1234', email: 'example@example.com' }, false, undefined]);
      useCollection.mockReturnValue([{ docs: [] }, false, undefined]);
  
      renderWithProviders(<Home />);
  
      expect(screen.getByText(/Main Server/i)).toBeInTheDocument();
    });
  });