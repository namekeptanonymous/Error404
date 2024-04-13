import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServerIcon from './ServerIcon';

describe('ServerIcon component', () => {
  test('renders ServerIcon component with provided image', () => {
    render(<ServerIcon image="sample_image.png" />);
    
    const imageElement = screen.getByAltText('');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.tagName).toBe('IMG');

    expect(imageElement).toHaveAttribute('src', 'sample_image.png');

    expect(imageElement).toHaveClass('h-12');
    expect(imageElement).toHaveClass('cursor-pointer');
    expect(imageElement).toHaveClass('rounded-full');
    expect(imageElement).toHaveClass('transition-all');
    expect(imageElement).toHaveClass('duration-100');
    expect(imageElement).toHaveClass('ease-out');
    expect(imageElement).toHaveClass('hover:rounded-2xl');
    expect(imageElement).toHaveClass('bg-discord_serversBg');
  });
});