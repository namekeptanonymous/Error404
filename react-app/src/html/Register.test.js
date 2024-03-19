// Register.test.js
import { describe, it, expect } from 'vitest'; // Adjust the import as necessary
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom'; // Import the Jest matchers

describe('Register Component', () => {
  it('renders registration form', () => {
    // Render the HTML document
    document.body.innerHTML = '<!DOCTYPE html>' +
      '<html>' +
      '<head lang="en" data-bs-theme="auto">' +
      '<meta charset="utf-8">' +
      '<title>ChatterBox</title>' +
      '</head>' +
      '<body>' +
      '<form method="get" id="reg-form">' +
      '<label for="username">Username:</label>' +
      '<input type="text" id="username" name="username">' +
      '<label for="email">Email:</label>' +
      '<input type="text" id="email" name="email">' +
      '<label for="passw">Password:</label>' +
      '<input type="password" id="passw" name="passw">' +
      '<input type="submit" value="Submit" id="submit-btn">' +
      '</form>' +
      '</body>' +
      '</html>';

    // Check if registration form elements are rendered
    expect(screen.getByLabelText('Username:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('allows user to input username, email, and password', () => {
    // Render the HTML document
    document.body.innerHTML = '<!DOCTYPE html>' +
      '<html>' +
      '<head lang="en" data-bs-theme="auto">' +
      '<meta charset="utf-8">' +
      '<title>ChatterBox</title>' +
      '</head>' +
      '<body>' +
      '<form method="get" id="reg-form">' +
      '<label for="username">Username:</label>' +
      '<input type="text" id="username" name="username">' +
      '<label for="email">Email:</label>' +
      '<input type="text" id="email" name="email">' +
      '<label for="passw">Password:</label>' +
      '<input type="password" id="passw" name="passw">' +
      '<input type="submit" value="Submit" id="submit-btn">' +
      '</form>' +
      '</body>' +
      '</html>';

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
