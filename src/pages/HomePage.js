import React from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../components/MainContainer.js';
import Button from '../components/Button.js';

function HomePage() {
  return (
    <MainContainer 
      title="Welcome to Song Manager"
      description="Manage your music collection with ease. Add, edit, and organize your favorite songs."
    >
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>🎵 Your Music, Organized</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#666' }}>
            Song Manager helps you keep track of your music collection. 
            Whether you're a casual listener or a music enthusiast, 
            this app makes it easy to organize and manage your songs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '12px', textAlign: 'center' }}>
            <h3>📚 View Songs</h3>
            <p>Browse your music collection with pagination and search capabilities.</p>
            <Link to="/songs" style={{ textDecoration: 'none' }}>
              <Button variant="primary" style={{ marginTop: '1rem' }}>
                Go to Songs
              </Button>
            </Link>
          </div>

          <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '12px', textAlign: 'center' }}>
            <h3>➕ Add Songs</h3>
            <p>Add new songs to your collection with a simple, intuitive form.</p>
            <Link to="/add-song" style={{ textDecoration: 'none' }}>
              <Button variant="success" style={{ marginTop: '1rem' }}>
                Add New Song
              </Button>
            </Link>
          </div>
        </div>

        <div style={{ padding: '2rem', backgroundColor: '#e3f2fd', borderRadius: '12px', marginBottom: '2rem' }}>
          <h3>🚀 Quick Start</h3>
          <p style={{ marginBottom: '1rem' }}>
            Ready to get started? Here's what you can do:
          </p>
          <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
            <li>Click "Add New Song" to add your first song</li>
            <li>Go to "Songs" to view and manage your collection</li>
            <li>Use the edit and delete buttons to keep your list organized</li>
            <li>Check out the "About" page to learn more about the app</li>
          </ol>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/songs" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="large">Browse Songs</Button>
          </Link>
          <Link to="/add-song" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="large">Add Song</Button>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="large">Learn More</Button>
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}

export default HomePage; 