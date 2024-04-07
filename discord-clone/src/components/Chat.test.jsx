import { render, screen } from "@testing-library/react";
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../features/channelSlice'; // replace with the path to your channelSlice
import Chat from './Chat';

vi.mock('react-firebase-hooks/auth');
vi.mock('react-firebase-hooks/firestore');

describe('Chat component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it('renders "Message #channelName" placeholder and channelId is present', async () => {
        useAuthState.mockReturnValue([{ displayName: 'Test User', uid: '1234', email: 'example@example.com' }]);
        useCollection.mockReturnValue([{ docs: [] }]);

        const mockStore = configureStore({
            reducer: {
                channel: channelReducer,
            },
            preloadedState: {
                channel: {
                channelId: 'testChannelId',
                channelName: 'testChannelName',
                },
            },
        });

        render(
            <Provider store={mockStore}>
                <Chat />
            </Provider>,
            { wrapper: BrowserRouter }
        );

        const input = await screen.findByPlaceholderText('Message #testChannelName');
        expect(input).toBeInTheDocument();
    });

    it('renders "Select a channel" placeholder when user is logged in and no channel is selected', async () => {
        useAuthState.mockReturnValue([{ displayName: 'Test User', uid: '1234', email: 'example@example.com' }]);
        useCollection.mockReturnValue([{ docs: [] }]);

        const mockStore = configureStore({
            reducer: {
                channel: channelReducer,
            },
            preloadedState: {},
        });

        render(
            <Provider store={mockStore}>
                <Chat />
            </Provider>,
            { wrapper: BrowserRouter }
        );

        const input = await screen.findByPlaceholderText('Select a channel');
        expect(input).toBeInTheDocument();
    });

    it('renders message placeholder when a channel is selected and messages are present', async () => {
        useAuthState.mockReturnValue([{ displayName: 'Test User', uid: '1234', email: 'example@example.com' }]);
        useCollection.mockReturnValue([{ 
            docs: [
              { 
                id: '1', 
                data: () => ({ message: 'Test message 1', timestamp: null, name: 'Test User', photoURL: '', email: '' }) 
              }
            ] 
        }]);

        const mockStore = configureStore({
            reducer: {
                channel: channelReducer,
            },
            preloadedState: {
                channel: {
                channelId: 'testChannelId',
                channelName: 'testChannelName',
                },
            },
        });

        render(
            <Provider store={mockStore}>
                <Chat />
            </Provider>,
            { wrapper: BrowserRouter }
        );

        const text = await screen.findByText("Test message 1");
        expect(text).toBeInTheDocument();
    });

});