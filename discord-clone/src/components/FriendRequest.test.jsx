import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendRequests from './FriendRequest';

describe('FriendRequests Component', () => {
  it('renders without errors', () => {
    render(<FriendRequests />);
    expect(screen.getByText('Pending Friend Requests')).toBeInTheDocument();
    expect(screen.getAllByText('Accept').length).toBe(1);
    expect(screen.getAllByText('Decline').length).toBe(1);
  });
});
