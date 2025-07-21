import React from 'react';
import styled from '@emotion/styled';
import Button from './Button.js';

const FilterContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 576px) {
    padding: 0.75rem;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
  @media (max-width: 576px) {
    gap: 0.5rem;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  @media (max-width: 576px) {
    min-width: 0;
    font-size: 0.95rem;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  width: 100%;
  @media (max-width: 576px) {
    font-size: 0.95rem;
  }
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: #333;
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const ResultsInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

function SongFilters({ 
  searchTerm, 
  onSearchChange, 
  yearFilter, 
  onYearFilterChange, 
  sortBy, 
  onSortChange,
  totalSongs,
  filteredCount 
}) {
  // Generate year options (from 1950 to current year)
  const currentYear = new Date().getFullYear();
  const years = ['All Years', ...Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i)];

  return (
    <FilterContainer>
      <FilterRow>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <FilterLabel htmlFor="search">Search:</FilterLabel>
          <SearchInput
            id="search"
            type="text"
            placeholder="Search by title, artist, or album..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div>
          <FilterLabel htmlFor="yearFilter">Year:</FilterLabel>
          <Select
            id="yearFilter"
            value={yearFilter}
            onChange={(e) => onYearFilterChange(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </div>
        
        <div>
          <FilterLabel htmlFor="sortBy">Sort by:</FilterLabel>
          <Select
            id="sortBy"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="year">Year</option>
            <option value="id">Date Added</option>
          </Select>
        </div>
      </FilterRow>
      
      <ResultsInfo>
        Showing {filteredCount} of {totalSongs} songs
        {(searchTerm || yearFilter !== 'All Years') && (
          <Button 
            variant="outline" 
            size="small" 
            onClick={() => {
              onSearchChange('');
              onYearFilterChange('All Years');
            }}
            style={{ marginLeft: '1rem' }}
          >
            Clear Filters
          </Button>
        )}
      </ResultsInfo>
    </FilterContainer>
  );
}

export default SongFilters; 