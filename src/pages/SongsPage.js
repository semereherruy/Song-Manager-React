import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSongsRequest } from '../store/songsSlice.js';
import MainContainer from '../components/MainContainer.js';
import SongList from '../components/SongList.js';
import MusicFilters from '../components/MusicFilters.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

function SongsPage() {
  const dispatch = useDispatch();
  const { filteredSongs, loading, error } = useSelector(state => state.songs);
  
  // Fetch songs when component mounts
  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  return (
    <MainContainer 
      title="🎵 Music Library"
      description="Explore Ethiopian music classics and Billboard hits. Search, filter, and discover amazing songs from around the world."
    >
      {/* Enhanced Music Filters */}
      <MusicFilters />

      {/* Loading and Error States */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner message="Loading your music collection..." />
        </div>
      )}
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          color: 'red',
          backgroundColor: '#ffe6e6',
          borderRadius: '8px',
          border: '1px solid #ffcccc'
        }}>
          <p>Error loading songs: {error}</p>
        </div>
      )}
      
      {/* Song List with filtered data */}
      {!loading && !error && (
        <SongList songs={filteredSongs} />
      )}
    </MainContainer>
  );
}

export default SongsPage; 