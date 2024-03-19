// Register.test.js
import { describe, it, expect } from 'vitest'; // Adjust the import as necessary
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import the Jest matchers

import Register from './Register'; // Adjust the import path as necessary

describe('Register Component', () => {
  it('renders registration form', () => {
    render(<Register />);

    // Check if registration form elements are rendered
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('allows user to input username, email, and password', () => {
    render(<Register />);

    const usernameInput = screen.getByLabelText('Username:');
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Check if inputs have correct values
    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('testpassword');
  });
});
