import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal'; // Ensure this points to the correct file

describe('Modal Component', () => {
  let mockClose;

  beforeEach(() => {
    mockClose = vi.fn();
    vi.resetAllMocks();  // Clear any mocks before each test
  });

  afterEach(() => {
    vi.restoreAllMocks();  // Restore mocks after each test
  });

  it('renders correctly when open', () => {
    render(<Modal isOpen={true} close={mockClose}>Test Content</Modal>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render when not open', () => {
    render(<Modal isOpen={false} close={mockClose}>Test Content</Modal>);
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('does not close when modal content is clicked', () => {
    render(<Modal isOpen={true} close={mockClose}>Test Content</Modal>);
    const modalContent = screen.getByText('Test Content').closest('.modal-content');
    if (modalContent) {
      fireEvent.click(modalContent);
    }
    expect(mockClose).not.toHaveBeenCalled();
  });

  it('modifies body overflow style based on isOpen', () => {
    render(<Modal isOpen={true} close={mockClose}>Test Content</Modal>);
    expect(document.body.style.overflow).toBe('hidden');
    render(<Modal isOpen={false} close={mockClose}>Test Content</Modal>);
    expect(document.body.style.overflow).toBe('unset');
  });
});
