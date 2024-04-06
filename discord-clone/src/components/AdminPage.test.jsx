import { render, screen } from "@testing-library/react";
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import AdminPage from './AdminPage';

vi.mock('react-firebase-hooks/auth');
vi.mock('react-firebase-hooks/firestore');

describe('AdminPage component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetAllMocks();
    });

    it('renders "Admin Page" title', async () => {
        useAuthState.mockReturnValue([{ displayName: 'Test User' }]);
        useCollection.mockReturnValue([{ docs: [] }]);

        render(
            <AdminPage />,
            { wrapper: BrowserRouter }
        );

        const title = await screen.findByText('Admin Page');
        expect(title).toBeInTheDocument();
    });

    it('renders users and admins', async () => {
        useAuthState.mockReturnValue([{ displayName: 'Test User' }]);
        useCollection
            .mockReturnValueOnce([{ docs: [{ id: '1', data: () => ({ name: 'User 1' }) }] }])
            .mockReturnValueOnce([{ docs: [{ id: '1', data: () => ({ name: 'Admin 1' }) }] }]);

        render(
            <AdminPage />,
            { wrapper: BrowserRouter }
        );

        const user = await screen.findByText('User 1');
        const admin = await screen.findByText('Admin 1');

        expect(user).toBeInTheDocument();
        expect(admin).toBeInTheDocument();
    });
});