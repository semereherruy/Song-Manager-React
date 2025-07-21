import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { setFilters, searchSongs } from '../store/songsSlice.js';
import MusicService from '../services/musicService.js';
import Button from './Button.js';

const FiltersContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.875rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchInput = styled(Input)`
  grid-column: 1 / -1;
  font-size: 1rem;
  padding: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e1e5e9;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SourceBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  
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

function MusicFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.songs.filters);
  const statistics = useSelector(state => state.songs.statistics);
  
  const [localFilters, setLocalFilters] = useState(filters);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Load filter options
    setGenres(MusicService.getGenres());
    setLanguages(MusicService.getLanguages());
    setCountries(MusicService.getCountries());
  }, []);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    dispatch(setFilters({ [key]: value }));
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setLocalFilters(prev => ({ ...prev, search: query }));
    dispatch(setFilters({ search: query }));
  };

  const clearFilters = () => {
    const clearedFilters = {
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
    };
    setLocalFilters(clearedFilters);
    dispatch(setFilters(clearedFilters));
  };

  const getSourceLabel = (source) => {
    switch (source) {
      case 'ethiopian': return '🇪🇹 Ethiopian';
      case 'billboard': return '📊 Billboard';
      case 'custom': return '➕ Custom';
      default: return '🌍 All';
    }
  };

  return (
    <FiltersContainer>
      <SearchInput
        type="text"
        placeholder="Search songs, artists, albums, or genres..."
        value={localFilters.search}
        onChange={handleSearch}
      />
      
      <FilterGrid>
        <FilterGroup>
          <Label>Music Source</Label>
          <Select
            value={localFilters.source}
            onChange={(e) => handleFilterChange('source', e.target.value)}
          >
            <option value="all">🌍 All Sources</option>
            <option value="ethiopian">🇪🇹 Ethiopian Music</option>
            <option value="billboard">📊 Billboard Hot 100</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>Genre</Label>
          <Select
            value={localFilters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>Language</Label>
          <Select
            value={localFilters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
          >
            <option value="all">All Languages</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>Country</Label>
          <Select
            value={localFilters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
          >
            <option value="all">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>Year From</Label>
          <Input
            type="number"
            placeholder="1960"
            value={localFilters.yearFrom}
            onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
            min="1960"
            max="2024"
          />
        </FilterGroup>

        <FilterGroup>
          <Label>Year To</Label>
          <Input
            type="number"
            placeholder="2024"
            value={localFilters.yearTo}
            onChange={(e) => handleFilterChange('yearTo', e.target.value)}
            min="1960"
            max="2024"
          />
        </FilterGroup>

        <FilterGroup>
          <Label>Min Popularity</Label>
          <Input
            type="number"
            placeholder="0"
            value={localFilters.minPopularity}
            onChange={(e) => handleFilterChange('minPopularity', e.target.value)}
            min="0"
            max="100"
          />
        </FilterGroup>

        <FilterGroup>
          <Label>Sort By</Label>
          <Select
            value={localFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="year">Year</option>
            <option value="popularity">Popularity</option>
            <option value="duration">Duration</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>Sort Order</Label>
          <Select
            value={localFilters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </FilterGroup>
      </FilterGrid>

      <ButtonGroup>
        <Button variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
        <Button variant="primary">
          Apply Filters
        </Button>
      </ButtonGroup>

      {statistics && (
        <StatsContainer>
          <StatCard>
            <StatNumber>{statistics.totalSongs}</StatNumber>
            <StatLabel>Total Songs</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{statistics.totalArtists}</StatNumber>
            <StatLabel>Artists</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{statistics.totalGenres}</StatNumber>
            <StatLabel>Genres</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{statistics.avgPopularity}</StatNumber>
            <StatLabel>Avg Popularity</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{statistics.yearRange.min}-{statistics.yearRange.max}</StatNumber>
            <StatLabel>Year Range</StatLabel>
          </StatCard>
        </StatsContainer>
      )}
    </FiltersContainer>
  );
}

export default MusicFilters; 