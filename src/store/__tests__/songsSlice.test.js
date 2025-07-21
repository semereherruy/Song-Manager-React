import songsReducer, {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong,
} from '../songsSlice.js';

describe('songsSlice', () => {
  const initialState = {
    list: [],
    loading: false,
    error: null,
  };

  test('should return the initial state', () => {
    expect(songsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle fetchSongsRequest', () => {
    const nextState = songsReducer(initialState, fetchSongsRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBe(null);
  });

  test('should handle fetchSongsSuccess', () => {
    const mockSongs = [
      { id: 1, title: 'Song 1', artist: 'Artist 1' },
      { id: 2, title: 'Song 2', artist: 'Artist 2' },
    ];
    const state = { ...initialState, loading: true };
    const nextState = songsReducer(state, fetchSongsSuccess(mockSongs));
    
    expect(nextState.loading).toBe(false);
    expect(nextState.list).toEqual(mockSongs);
    expect(nextState.error).toBe(null);
  });

  test('should handle fetchSongsFailure', () => {
    const errorMessage = 'Failed to fetch songs';
    const state = { ...initialState, loading: true };
    const nextState = songsReducer(state, fetchSongsFailure(errorMessage));
    
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  test('should handle addSong', () => {
    const newSong = { id: 3, title: 'New Song', artist: 'New Artist' };
    const state = { ...initialState, list: [{ id: 1, title: 'Song 1' }] };
    const nextState = songsReducer(state, addSong(newSong));
    
    expect(nextState.list).toHaveLength(2);
    expect(nextState.list).toContainEqual(newSong);
  });

  test('should handle updateSong', () => {
    const existingSong = { id: 1, title: 'Old Title', artist: 'Artist 1' };
    const updatedSong = { id: 1, title: 'New Title', artist: 'Artist 1' };
    const state = { ...initialState, list: [existingSong] };
    const nextState = songsReducer(state, updateSong(updatedSong));
    
    expect(nextState.list).toHaveLength(1);
    expect(nextState.list[0]).toEqual(updatedSong);
  });

  test('should handle deleteSong', () => {
    const songToDelete = { id: 2, title: 'Song 2', artist: 'Artist 2' };
    const state = {
      ...initialState,
      list: [
        { id: 1, title: 'Song 1', artist: 'Artist 1' },
        songToDelete,
      ],
    };
    const nextState = songsReducer(state, deleteSong(2));
    
    expect(nextState.list).toHaveLength(1);
    expect(nextState.list).not.toContainEqual(songToDelete);
  });
}); 