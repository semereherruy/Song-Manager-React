import React from 'react';
import MainContainer from '../components/MainContainer.js';
import AddSongForm from '../components/AddSongForm.js';

function AddSongPage() {
  return (
    <MainContainer 
      title="Add New Song"
      description="Add a new song to your music collection. Fill in the details below to get started."
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <AddSongForm />
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h4>Tips for adding songs:</h4>
          <ul style={{ marginTop: '0.5rem' }}>
            <li>Make sure to include the correct artist name</li>
            <li>Use the original album title</li>
            <li>Enter the release year accurately</li>
            <li>You can edit or delete songs later from the Songs page</li>
          </ul>
        </div>
      </div>
    </MainContainer>
  );
}

export default AddSongPage; 