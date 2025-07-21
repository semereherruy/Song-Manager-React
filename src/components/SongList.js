import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSong, updateSong } from '../store/songsSlice.js';
import Button from './Button.js';
import styled from '@emotion/styled';

const SONGS_PER_PAGE = 10;

const SongContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const SongHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const SongInfo = styled.div`
  flex: 1;
`;

const SongTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.25rem;
`;

const SongArtist = styled.p`
  margin: 0 0 0.25rem 0;
  color: #666;
  font-size: 1rem;
`;

const SongDetails = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const DetailItem = styled.span`
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666;
`;

const SourceBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.ethiopian {
    background: #e8f5e8;
    color: #2d5a2d;
  }
  
  &.billboard {
    background: #fff3cd;
    color: #856404;
  }
  
  &.custom {
    background: #d1ecf1;
    color: #0c5460;
  }
`;

const PopularityBar = styled.div`
  width: 100px;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const PopularityFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  width: ${props => props.popularity}%;
  transition: width 0.3s ease;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const EditForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PageInfo = styled.span`
  font-weight: 600;
  color: #666;
`;

function SongList({ songs = [] }) {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({ 
    title: '', 
    artist: '', 
    album: '', 
    year: '',
    genre: '',
    language: ''
  });
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    dispatch(deleteSong(id));
  };

  const handleEdit = (song) => {
    setEditingId(song.id);
    setEditFields({
      title: song.title || '',
      artist: song.artist || '',
      album: song.album || '',
      year: song.year || '',
      genre: song.genre || '',
      language: song.language || ''
    });
  };

  const handleEditChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSong({ id: editingId, ...editFields }));
    setEditingId(null);
    setEditFields({ title: '', artist: '', album: '', year: '', genre: '', language: '' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFields({ title: '', artist: '', album: '', year: '', genre: '', language: '' });
  };

  // Pagination logic
  const totalPages = Math.ceil(songs.length / SONGS_PER_PAGE);
  const startIdx = (page - 1) * SONGS_PER_PAGE;
  const endIdx = startIdx + SONGS_PER_PAGE;
  const paginatedSongs = songs.slice(startIdx, endIdx);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    // If deleting the last item on the last page, go back a page
    if (page > totalPages) setPage(totalPages || 1);
  }, [songs, page, totalPages]);

  if (!songs.length) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>No songs found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>🎵 Music Collection ({songs.length} songs)</h3>
      
      {paginatedSongs.map(song => (
        <SongContainer key={song.id}>
          <SongHeader>
            <SongInfo>
              <SongTitle>{song.title}</SongTitle>
              <SongArtist>by {song.artist}</SongArtist>
              
              <SongDetails>
                <DetailItem>📀 {song.album}</DetailItem>
                <DetailItem>📅 {song.year}</DetailItem>
                <DetailItem>🎵 {song.genre}</DetailItem>
                <DetailItem>🌍 {song.language}</DetailItem>
                {song.duration && <DetailItem>⏱️ {song.duration}</DetailItem>}
                {song.country && <DetailItem>🏳️ {song.country}</DetailItem>}
                {song.billboardRank && <DetailItem>📊 #{song.billboardRank}</DetailItem>}
              </SongDetails>
              
              {song.popularity && (
                <div>
                  <DetailItem>Popularity: {song.popularity}%</DetailItem>
                  <PopularityBar>
                    <PopularityFill popularity={song.popularity} />
                  </PopularityBar>
                </div>
              )}
            </SongInfo>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
              <SourceBadge className={song.source}>
                {song.source === 'ethiopian' ? '🇪🇹 Ethiopian' : 
                 song.source === 'billboard' ? '📊 Billboard' : '➕ Custom'}
              </SourceBadge>
              
              <ActionButtons>
                <Button variant="secondary" size="small" onClick={() => handleEdit(song)}>
                  ✏️ Edit
                </Button>
                <Button variant="danger" size="small" onClick={() => handleDelete(song.id)}>
                  🗑️ Delete
                </Button>
              </ActionButtons>
            </div>
          </SongHeader>
          
          {editingId === song.id && (
            <EditForm onSubmit={handleEditSubmit}>
              <FormInput
                name="title"
                placeholder="Title"
                value={editFields.title}
                onChange={handleEditChange}
                required
              />
              <FormInput
                name="artist"
                placeholder="Artist"
                value={editFields.artist}
                onChange={handleEditChange}
                required
              />
              <FormInput
                name="album"
                placeholder="Album"
                value={editFields.album}
                onChange={handleEditChange}
                required
              />
              <FormInput
                name="year"
                placeholder="Year"
                type="number"
                value={editFields.year}
                onChange={handleEditChange}
                required
              />
              <FormInput
                name="genre"
                placeholder="Genre"
                value={editFields.genre}
                onChange={handleEditChange}
              />
              <FormInput
                name="language"
                placeholder="Language"
                value={editFields.language}
                onChange={handleEditChange}
              />
              <Button type="submit" variant="success" size="small">💾 Save</Button>
              <Button type="button" variant="secondary" size="small" onClick={handleCancelEdit}>❌ Cancel</Button>
            </EditForm>
          )}
        </SongContainer>
      ))}
      
      {totalPages > 1 && (
        <PaginationContainer>
          <Button onClick={handlePrev} disabled={page === 1} size="small">⬅️ Previous</Button>
          <PageInfo>Page {page} of {totalPages}</PageInfo>
          <Button onClick={handleNext} disabled={page === totalPages} size="small">Next ➡️</Button>
        </PaginationContainer>
      )}
    </div>
  );
}

export default SongList; 