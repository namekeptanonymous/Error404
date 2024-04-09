import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Settings from './Settings';

describe('Settings component', () => {
  test('validates email input and displays feedback', async () => {
    const { getByLabelText, getByText } = render(<Settings />);
    const emailInput = getByLabelText('Email:');
    const saveBtn = getByText('Save Changes');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      const validFeedback = getByText('Valid email address');
      expect(validFeedback).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: 'invalid email' } });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      const invalidFeedback = getByText('Please enter a valid email address');
      expect(invalidFeedback).toBeInTheDocument();
    });
  });
});
