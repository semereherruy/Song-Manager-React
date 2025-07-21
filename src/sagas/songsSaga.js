import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from '../store/songsSlice.js';
import MusicService from '../services/musicService.js';

// Worker saga: performs the async fetch
function* fetchSongs() {
  try {
    // Simulate API call delay for better UX
    yield call(() => new Promise(resolve => setTimeout(resolve, 800)));
    
    // Get all songs from our music service
    const songs = MusicService.getAllSongs();
    
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

// Watcher saga: spawns a new fetchSongs task on each fetchSongsRequest
export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
} 