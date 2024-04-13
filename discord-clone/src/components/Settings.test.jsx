import { render, screen } from "@testing-library/react";
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import Settings from './Settings';

describe('Settings component', () => {
  it('renders "Profile Settings" title', () => {
    render(<Settings />);
    const titleElement = screen.getByText('Profile Settings');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders "Username" input field', () => {
    render(<Settings />);
    const usernameInput = screen.getByPlaceholderText('Enter a new username');
    expect(usernameInput).toBeInTheDocument();
  });

  it('renders "Profile Picture" input field', () => {
    render(<Settings />);
    const profilePicInput = screen.getByLabelText('Profile Picture:');
    expect(profilePicInput).toBeInTheDocument();
  });

  it('renders "Save Changes" button', () => {
    render(<Settings />);
    const saveChangesButton = screen.getByText('Save Changes');
    expect(saveChangesButton).toBeInTheDocument();
  });

  it('renders "Changes saved!" confirmation', () => {
    render(<Settings />);
    const saveConfirmation = screen.getByText('Changes saved!');
    expect(saveConfirmation).toBeInTheDocument();
  });

  it('renders loading spinner', () => {
    render(<Settings />);
    const loadingSpinner = screen.getByText('Saving...');
    expect(loadingSpinner).toBeInTheDocument();
  });
});