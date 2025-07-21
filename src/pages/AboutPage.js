import React from 'react';
import MainContainer from '../components/MainContainer.js';

function AboutPage() {
  return (
    <MainContainer 
      title="About Song Manager"
      description="Learn more about this application and the technologies used to build it."
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h3>What is Song Manager?</h3>
          <p>
            Song Manager is a modern web application built with React that helps you organize and manage your music collection. 
            It provides a clean, intuitive interface for adding, editing, and organizing your favorite songs.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3>Features</h3>
          <ul>
            <li><strong>Add Songs:</strong> Easily add new songs with title, artist, album, and year</li>
            <li><strong>Edit Songs:</strong> Update song details inline with a simple click</li>
            <li><strong>Delete Songs:</strong> Remove songs you no longer want in your collection</li>
            <li><strong>Pagination:</strong> Navigate through large collections efficiently</li>
            <li><strong>Responsive Design:</strong> Works perfectly on desktop, tablet, and mobile</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3>Technologies Used</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Frontend</h4>
              <ul style={{ margin: '0.5rem 0' }}>
                <li>React 19</li>
                <li>React Router</li>
                <li>Emotion (CSS-in-JS)</li>
                <li>Webpack 5</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>State Management</h4>
              <ul style={{ margin: '0.5rem 0' }}>
                <li>Redux Toolkit</li>
                <li>Redux Saga</li>
                <li>React Redux</li>
              </ul>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Testing</h4>
              <ul style={{ margin: '0.5rem 0' }}>
                <li>Jest</li>
                <li>React Testing Library</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3>Project Structure</h3>
          <p>
            This project demonstrates modern React development practices including:
          </p>
          <ul>
            <li>Manual Webpack configuration (no Create React App)</li>
            <li>ES modules and modern JavaScript</li>
            <li>Component-based architecture</li>
            <li>Global state management</li>
            <li>Async operations with sagas</li>
            <li>Responsive styling with CSS-in-JS</li>
            <li>Unit testing</li>
          </ul>
        </section>
      </div>
    </MainContainer>
  );
}

export default AboutPage; 