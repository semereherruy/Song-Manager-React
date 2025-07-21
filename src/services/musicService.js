import { ethiopianSongs, ethiopianGenres, ethiopianLanguages } from '../data/ethiopianSongs.js';
import { billboardSongs, billboardGenres, billboardLanguages } from '../data/billboardSongs.js';

// Combine all songs with source identification
const allSongs = [
  ...ethiopianSongs.map(song => ({ ...song, source: 'ethiopian' })),
  ...billboardSongs.map(song => ({ ...song, source: 'billboard' }))
];

export class MusicService {
  // Get all songs
  static getAllSongs() {
    return allSongs;
  }

  // Get Ethiopian songs only
  static getEthiopianSongs() {
    return ethiopianSongs;
  }

  // Get Billboard songs only
  static getBillboardSongs() {
    return billboardSongs;
  }

  // Get songs by source
  static getSongsBySource(source) {
    return allSongs.filter(song => song.source === source);
  }

  // Search songs by text
  static searchSongs(query, source = 'all') {
    const songs = source === 'all' ? allSongs : this.getSongsBySource(source);
    
    if (!query) return songs;
    
    const lowercaseQuery = query.toLowerCase();
    
    return songs.filter(song => 
      song.title.toLowerCase().includes(lowercaseQuery) ||
      song.artist.toLowerCase().includes(lowercaseQuery) ||
      song.album.toLowerCase().includes(lowercaseQuery) ||
      song.genre.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Filter songs by multiple criteria
  static filterSongs(filters, songs = allSongs) {
    let filteredSongs = songs;

    // Filter by source
    if (filters.source && filters.source !== 'all') {
      filteredSongs = filteredSongs.filter(song => song.source === filters.source);
    }

    // Filter by genre
    if (filters.genre && filters.genre !== 'all') {
      filteredSongs = filteredSongs.filter(song => song.genre === filters.genre);
    }

    // Filter by language
    if (filters.language && filters.language !== 'all') {
      filteredSongs = filteredSongs.filter(song => song.language === filters.language);
    }

    // Filter by year range
    if (filters.yearFrom && filters.yearFrom !== '') {
      filteredSongs = filteredSongs.filter(song => song.year >= parseInt(filters.yearFrom));
    }
    if (filters.yearTo && filters.yearTo !== '') {
      filteredSongs = filteredSongs.filter(song => song.year <= parseInt(filters.yearTo));
    }

    // Filter by popularity
    if (filters.minPopularity && filters.minPopularity !== '') {
      filteredSongs = filteredSongs.filter(song => song.popularity >= parseInt(filters.minPopularity));
    }

    // Filter by country
    if (filters.country && filters.country !== 'all') {
      filteredSongs = filteredSongs.filter(song => song.country === filters.country);
    }

    // Apply search filter
    if (filters.search && filters.search.trim() !== '') {
      const searchQuery = filters.search.toLowerCase().trim();
      filteredSongs = filteredSongs.filter(song => 
        song.title.toLowerCase().includes(searchQuery) ||
        song.artist.toLowerCase().includes(searchQuery) ||
        song.album.toLowerCase().includes(searchQuery) ||
        song.genre.toLowerCase().includes(searchQuery)
      );
    }

    return filteredSongs;
  }

  // Sort songs
  static sortSongs(songs, sortBy = 'title', sortOrder = 'asc') {
    const sortedSongs = [...songs];
    
    sortedSongs.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle special cases
      if (sortBy === 'duration') {
        aValue = this.parseDuration(aValue);
        bValue = this.parseDuration(bValue);
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sortedSongs;
  }

  // Parse duration string to minutes
  static parseDuration(duration) {
    const parts = duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }

  // Get unique genres
  static getGenres(source = 'all') {
    if (source === 'ethiopian') return ethiopianGenres;
    if (source === 'billboard') return billboardGenres;
    
    const allGenres = [...new Set(allSongs.map(song => song.genre))];
    return allGenres.sort();
  }

  // Get unique languages
  static getLanguages(source = 'all') {
    if (source === 'ethiopian') return ethiopianLanguages;
    if (source === 'billboard') return billboardLanguages;
    
    const allLanguages = [...new Set(allSongs.map(song => song.language))];
    return allLanguages.sort();
  }

  // Get unique countries
  static getCountries() {
    const countries = [...new Set(allSongs.map(song => song.country))];
    return countries.sort();
  }

  // Get statistics
  static getStatistics(source = 'all', songs = allSongs) {
    const songsToAnalyze = source === 'all' ? songs : songs.filter(song => song.source === source);
    
    const totalSongs = songsToAnalyze.length;
    const totalArtists = new Set(songsToAnalyze.map(song => song.artist)).size;
    const totalAlbums = new Set(songsToAnalyze.map(song => song.album)).size;
    const totalGenres = new Set(songsToAnalyze.map(song => song.genre)).size;
    
    const yearRange = {
      min: Math.min(...songsToAnalyze.map(song => song.year)),
      max: Math.max(...songsToAnalyze.map(song => song.year))
    };
    
    const avgPopularity = songsToAnalyze.reduce((sum, song) => sum + song.popularity, 0) / totalSongs;
    
    const genreBreakdown = songsToAnalyze.reduce((acc, song) => {
      acc[song.genre] = (acc[song.genre] || 0) + 1;
      return acc;
    }, {});
    
    const topArtists = songsToAnalyze.reduce((acc, song) => {
      acc[song.artist] = (acc[song.artist] || 0) + 1;
      return acc;
    }, {});
    
    const topArtistsList = Object.entries(topArtists)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([artist, count]) => ({ artist, count }));
    
    return {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      yearRange,
      avgPopularity: Math.round(avgPopularity),
      genreBreakdown,
      topArtists: topArtistsList
    };
  }

  // Get top songs by popularity
  static getTopSongs(limit = 10, source = 'all') {
    const songs = source === 'all' ? allSongs : this.getSongsBySource(source);
    return this.sortSongs(songs, 'popularity', 'desc').slice(0, limit);
  }

  // Get songs by artist
  static getSongsByArtist(artist, source = 'all') {
    const songs = source === 'all' ? allSongs : this.getSongsBySource(source);
    return songs.filter(song => 
      song.artist.toLowerCase().includes(artist.toLowerCase())
    );
  }

  // Get songs by album
  static getSongsByAlbum(album, source = 'all') {
    const songs = source === 'all' ? allSongs : this.getSongsBySource(source);
    return songs.filter(song => 
      song.album.toLowerCase().includes(album.toLowerCase())
    );
  }
}

export default MusicService; 