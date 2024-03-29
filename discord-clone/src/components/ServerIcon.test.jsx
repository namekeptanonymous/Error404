import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServerIcon from './ServerIcon';

describe('ServerIcon component', () => {
  test('renders ServerIcon component with provided image', () => {
    // Render the ServerIcon component with a sample image
    render(<ServerIcon image="sample_image.png" />);
    
    // Check if the image is rendered with the correct source
    const imageElement = screen.getByAltText('');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.tagName).toBe('IMG'); // Check if the element is an img tag

    // Check if the image has the correct source
    expect(imageElement).toHaveAttribute('src', 'sample_image.png');

    // Check if the image has the correct CSS classes
    expect(imageElement).toHaveClass('h-12');
    expect(imageElement).toHaveClass('cursor-pointer');
    expect(imageElement).toHaveClass('rounded-full');
    expect(imageElement).toHaveClass('transition-all');
    expect(imageElement).toHaveClass('duration-100');
    expect(imageElement).toHaveClass('ease-out');
    expect(imageElement).toHaveClass('hover:rounded-2xl');
  });
});
