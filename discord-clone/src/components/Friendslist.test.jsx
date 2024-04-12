import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FriendsList from './FriendsList';  // Ensure this points to the correct file

describe('FriendsList Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});  // Mock console.log to suppress output during tests
  });

  it('renders online and offline friends correctly', () => {
    render(<FriendsList />);
    // Check for online friends
    const onlineFriends = screen.getAllByText(/John Doe/);
    expect(onlineFriends).toHaveLength(1);
    expect(screen.getByText('John Doe').closest('div')).toHaveTextContent('Remove');

    // Check for offline friends
    const offlineFriends = screen.getAllByText(/Jane Smith/);
    expect(offlineFriends).toHaveLength(1);
    expect(screen.getByText('Jane Smith').closest('div')).toHaveTextContent('Remove');
  });

  it('calls removeFriend when remove button is clicked', () => {
    render(<FriendsList />);
    const removeButton = screen.getAllByText('Remove')[0];  // Assuming the first friend is online
    fireEvent.click(removeButton);
    expect(console.log).toHaveBeenCalledWith('Remove friend with ID: 1');
  });

  it('calls addFriend when the add friend button is clicked', () => {
    render(<FriendsList />);
    const addButton = screen.getByText('Add Friend');
    fireEvent.click(addButton);
    expect(console.log).toHaveBeenCalledWith("Add friend logic here");
  });
});
