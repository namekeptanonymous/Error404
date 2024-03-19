// FriendsList.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendsList from './Friendslist'; // Adjust the import path as necessary

describe('FriendsList Component', () => {
  it('renders pending requests, direct messages, and active now sections correctly', () => {
    render(<FriendsList />);

    // Check for the "Pending" section header and items
    expect(screen.getByText(/PENDING — 2/)).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Brown')).toBeInTheDocument();

    // Check for the "Direct Messages" section header and items
    expect(screen.getByText('DIRECT MESSAGES')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check for the "Active Now" section header and item
    expect(screen.getByText('ACTIVE NOW')).toBeInTheDocument();
    expect(screen.getByText('Charlie Davis')).toBeInTheDocument();
  });

});


