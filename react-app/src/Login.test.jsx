// Login.test.js
import { describe, it, expect } from 'vitest'; // Adjust the import as necessary
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the Jest matchers

import Login from './Login'; // Adjust the import path as necessary

describe('Login Component', () => {
  it('renders registration form', () => {
    render(<Login />);

    // Check if registration form elements are rendered
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('allows user to input username, email, and password', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Check if inputs have correct values
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpassword');
  });
});
