import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong } from '../store/songsSlice.js';
import Button from './Button.js';

function AddSongForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !artist || !album || !year) return;
    dispatch(addSong({
      id: Date.now(),
      title,
      artist,
      album,
      year,
    }));
    setTitle('');
    setArtist('');
    setAlbum('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add a New Song</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={e => setArtist(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Album"
          value={album}
          onChange={e => setAlbum(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
          required
        />
        <Button type="submit" variant="success">Add Song</Button>
      </div>
    </form>
  );
}

export default AddSongForm; 