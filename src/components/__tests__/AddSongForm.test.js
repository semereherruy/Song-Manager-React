import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import songsReducer from '../../store/songsSlice.js';
import AddSongForm from '../AddSongForm.js';

// Create a mock store for testing
const createTestStore = () => {
  return configureStore({
    reducer: {
      songs: songsReducer,
    },
  });
};

// Mock the Redux hooks
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('AddSongForm Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('renders form with all input fields', () => {
    render(<AddSongForm />);
    
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/artist/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/album/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/year/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add song/i })).toBeInTheDocument();
  });

  test('submits form with song data', async () => {
    render(<AddSongForm />);
    
    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/title/i), {
      target: { value: 'Test Song' },
    });
    fireEvent.change(screen.getByPlaceholderText(/artist/i), {
      target: { value: 'Test Artist' },
    });
    fireEvent.change(screen.getByPlaceholderText(/album/i), {
      target: { value: 'Test Album' },
    });
    fireEvent.change(screen.getByPlaceholderText(/year/i), {
      target: { value: '2023' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add song/i }));
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'songs/addSong',
          payload: expect.objectContaining({
            title: 'Test Song',
            artist: 'Test Artist',
            album: 'Test Album',
            year: '2023',
          }),
        })
      );
    });
  });

  test('clears form after submission', async () => {
    render(<AddSongForm />);
    
    // Fill out the form
    const titleInput = screen.getByPlaceholderText(/title/i);
    const artistInput = screen.getByPlaceholderText(/artist/i);
    
    fireEvent.change(titleInput, { target: { value: 'Test Song' } });
    fireEvent.change(artistInput, { target: { value: 'Test Artist' } });
    fireEvent.change(screen.getByPlaceholderText(/album/i), { target: { value: 'Test Album' } });
    fireEvent.change(screen.getByPlaceholderText(/year/i), { target: { value: '2023' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add song/i }));
    
    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(artistInput.value).toBe('');
    });
  });

  test('does not submit empty form', () => {
    render(<AddSongForm />);
    
    // Try to submit without filling the form
    fireEvent.click(screen.getByRole('button', { name: /add song/i }));
    
    expect(mockDispatch).not.toHaveBeenCalled();
  });
}); 