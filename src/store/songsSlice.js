import { createSlice } from '@reduxjs/toolkit';
import MusicService from '../services/musicService.js';

const initialState = {
  songs: [],
  filteredSongs: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    source: 'all',
    genre: 'all',
    language: 'all',
    country: 'all',
    yearFrom: '',
    yearTo: '',
    minPopularity: '',
    sortBy: 'title',
    sortOrder: 'asc'
  },
  statistics: null
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload;
      state.filteredSongs = action.payload;
      state.statistics = MusicService.getStatistics('all', action.payload);
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSong: (state, action) => {
      const newSong = {
        ...action.payload,
        id: Date.now(),
        source: 'custom',
        popularity: Math.floor(Math.random() * 100) + 1
      };
      state.songs.push(newSong);
      state.filteredSongs = MusicService.filterSongs(state.filters, state.songs);
    },
    updateSong: (state, action) => {
      const { id, ...updatedSong } = action.payload;
      const index = state.songs.findIndex(song => song.id === id);
      if (index !== -1) {
        state.songs[index] = { ...state.songs[index], ...updatedSong };
        state.filteredSongs = MusicService.filterSongs(state.filters, state.songs);
      }
    },
    deleteSong: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
      state.filteredSongs = MusicService.filterSongs(state.filters, state.songs);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters and update filtered songs
      const filtered = MusicService.filterSongs(state.filters, state.songs);
      state.filteredSongs = MusicService.sortSongs(
        filtered, 
        state.filters.sortBy, 
        state.filters.sortOrder
      );
      // Update statistics based on current filters
      state.statistics = MusicService.getStatistics(state.filters.source, state.songs);
    },
    searchSongs: (state, action) => {
      const { query, source } = action.payload;
      const searchResults = MusicService.searchSongs(query, source);
      state.filteredSongs = MusicService.sortSongs(
        searchResults,
        state.filters.sortBy,
        state.filters.sortOrder
      );
    },
    sortSongs: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.filters.sortBy = sortBy;
      state.filters.sortOrder = sortOrder;
      state.filteredSongs = MusicService.sortSongs(
        state.filteredSongs,
        sortBy,
        sortOrder
      );
    },
    updateStatistics: (state) => {
      state.statistics = MusicService.getStatistics(state.filters.source, state.songs);
    }
  }
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
  updateSong,
  deleteSong,
  setFilters,
  searchSongs,
  sortSongs,
  updateStatistics
} = songsSlice.actions;

export default songsSlice.reducer; 