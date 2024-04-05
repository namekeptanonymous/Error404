import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './Home';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth } from '../firebase';
import channelReducer from '../features/channelSlice'; // Update the import path as needed
import '@testing-library/jest-dom';

// Mocking modules
vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: vi.fn(() => vi.fn()), // Correctly mock useNavigate
  };
});
vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));
vi.mock('react-firebase-hooks/firestore', () => ({
  useCollection: vi.fn(),
}));

// Create mock store with the channel reducer
const mockStore = createStore(channelReducer, {
  channel: {
    channelId: null,
    channelName: null,
  },
});

// Helper function to render components with all necessary providers
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
      // Mock useNavigate if it's being used within the component
      vi.mock('react-router-dom', async () => {
        const originalModule = await vi.importActual('react-router-dom');
        return {
          ...originalModule,
          useNavigate: vi.fn(() => vi.fn()), // useNavigate is a hook that returns a function
        };
      });
    });
  
    it('renders without crashing when user is authenticated', async () => {
      useAuthState.mockReturnValue([{ displayName: 'Test User', uid: '1234' }, false, undefined]);
      useCollection.mockReturnValue([{ docs: [] }, false, undefined]);
  
      renderWithProviders(<Home />);
  
      expect(screen.getByText(/Main Server/i)).toBeInTheDocument();
    });

    /*
  
    // Make sure the redirect test is correctly awaiting async operations
    it('redirects to login if user is not authenticated', async () => {
      useAuthState.mockReturnValue([null, false, undefined]);
      const navigateMock = vi.fn();
      vi.mocked(vi.importActual('react-router-dom').useNavigate).mockImplementation(() => navigateMock);
  
      renderWithProviders(<Home />);
      await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/'));
    });
  
    it('allows user to log out', async () => {
      useAuthState.mockReturnValue([{ displayName: 'Test User', uid: '1234' }, false, undefined]);
      useCollection.mockReturnValue([{ docs: [] }, false, undefined]);
      const signOutMock = vi.fn();
      auth.signOut = signOutMock;
  
      renderWithProviders(<Home />);
  
      // If there are multiple images, you need to be more specific in your query.
      // For example, use getByAltText if your images have alt text.
      const logoutImage = screen.getAllByRole('img').find(img => img.onclick === handleLogout);
      if (logoutImage) userEvent.click(logoutImage);
      expect(signOutMock).toHaveBeenCalled();
    });
  
    */
   
  });