import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSong, updateSong } from '../store/songsSlice.js';
import Button from './Button.js';

const ITEM_HEIGHT = 60; // Height of each song item
const VISIBLE_ITEMS = 10; // Number of items visible at once

const SongItem = React.memo(({ song, onEdit, onDelete, isEditing, editFields, onEditChange, onEditSubmit, onCancelEdit }) => {
  return (
    <div style={{ 
      height: ITEM_HEIGHT, 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem', 
      padding: '0.5rem',
      borderBottom: '1px solid #eee'
    }}>
      {isEditing ? (
        <form onSubmit={onEditSubmit} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
          <input
            name="title"
            value={editFields.title}
            onChange={onEditChange}
            required
            style={{ width: '20%' }}
          />
          <input
            name="artist"
            value={editFields.artist}
            onChange={onEditChange}
            required
            style={{ width: '20%' }}
          />
          <input
            name="album"
            value={editFields.album}
            onChange={onEditChange}
            required
            style={{ width: '20%' }}
          />
          <input
            name="year"
            value={editFields.year}
            onChange={onEditChange}
            required
            style={{ width: '10%' }}
          />
          <Button type="submit" size="small" variant="success">Save</Button>
          <Button type="button" size="small" variant="secondary" onClick={onCancelEdit}>Cancel</Button>
        </form>
      ) : (
        <>
          <span style={{ flex: 1 }}>
            <strong>{song.title}</strong> by {song.artist} ({song.year})
          </span>
          <Button variant="secondary" size="small" onClick={() => onEdit(song)}>
            Edit
          </Button>
          <Button variant="danger" size="small" onClick={() => onDelete(song.id)}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
});

function VirtualizedSongList({ songs = [] }) {
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editFields, setEditFields] = useState({ title: '', artist: '', album: '', year: '' });
  const [scrollTop, setScrollTop] = useState(0);

  const handleDelete = (id) => {
    dispatch(deleteSong(id));
  };

  const handleEdit = (song) => {
    setEditingId(song.id);
    setEditFields({
      title: song.title,
      artist: song.artist,
      album: song.album,
      year: song.year,
    });
  };

  const handleEditChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSong({ id: editingId, ...editFields }));
    setEditingId(null);
    setEditFields({ title: '', artist: '', album: '', year: '' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFields({ title: '', artist: '', album: '', year: '' });
  };

  // Virtual scrolling calculations
  const totalHeight = songs.length * ITEM_HEIGHT;
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = Math.min(startIndex + VISIBLE_ITEMS, songs.length);
  const visibleSongs = songs.slice(startIndex, endIndex);
  const offsetY = startIndex * ITEM_HEIGHT;

  if (!songs.length) {
    return <p>No songs found. Try adjusting your search or filters.</p>;
  }

  return (
    <div>
      <h3>Song List ({songs.length} songs)</h3>
      <div 
        style={{ 
          height: '400px', 
          overflow: 'auto', 
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
        onScroll={(e) => setScrollTop(e.target.scrollTop)}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            {visibleSongs.map(song => (
              <SongItem
                key={song.id}
                song={song}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEditing={editingId === song.id}
                editFields={editFields}
                onEditChange={handleEditChange}
                onEditSubmit={handleEditSubmit}
                onCancelEdit={handleCancelEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualizedSongList; 