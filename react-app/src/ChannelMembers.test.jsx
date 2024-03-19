// ChannelMembers.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChannelMembers from './ChannelMembers.jsx'; // Adjust the import path as necessary

describe('ChannelMembers Component', () => {
  it('renders admin and member information correctly', () => {
    const testAdmins = [
      { name: 'Admin1', status: 'online', profilePic: '/path/to/admin1.jpg' },
    ];
    const testMembers = [
      { name: 'Member1', status: 'offline', profilePic: '/path/to/member1.jpg' },
    ];

    render(<ChannelMembers admins={testAdmins} members={testMembers} />);

    // Check for Admin1 details
    expect(screen.getByText('Admin1')).toBeInTheDocument();
    expect(screen.getByAltText('Admin1')).toHaveAttribute('src', '/path/to/admin1.jpg');
    expect(screen.getByText('Admin1').closest('li')).toHaveClass('online');

    // Check for Member1 details
    expect(screen.getByText('Member1')).toBeInTheDocument();
    expect(screen.getByAltText('Member1')).toHaveAttribute('src', '/path/to/member1.jpg');
    expect(screen.getByText('Member1').closest('li')).toHaveClass('offline');
  });
});
