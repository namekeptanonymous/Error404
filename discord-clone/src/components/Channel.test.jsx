import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from 'vitest';
import Channel from './Channel';

const mockDispatch = vi.fn();
vi.mock('react-redux', () => ({
    useDispatch: () => mockDispatch,
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

test('Channel component', async () => {
  const channelId = 123;
  const channelName = 'General';

  const channel = render(<Channel id={channelId} channelName={channelName} />);

  fireEvent.click(screen.getByText(channelName));

  // Verify that setChannelInfo was dispatched correctly
  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'channel/setChannelInfo',
    payload: {
      channelId,
      channelName,
    },
  });

  // Verify that navigate was called with the correct route
  expect(mockNavigate).toHaveBeenCalledWith(`/channels/${channelId}`);
});