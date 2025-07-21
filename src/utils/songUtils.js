// Filter songs based on search term and year
export const filterSongs = (songs, searchTerm, yearFilter) => {
  return songs.filter(song => {
    // Search filter
    const searchMatch = !searchTerm || 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Year filter
    const yearMatch = yearFilter === 'All Years' || song.year.toString() === yearFilter;
    
    return searchMatch && yearMatch;
  });
};

// Sort songs based on sort criteria
export const sortSongs = (songs, sortBy) => {
  const sortedSongs = [...songs];
  
  switch (sortBy) {
    case 'title':
      return sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
    case 'artist':
      return sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist));
    case 'album':
      return sortedSongs.sort((a, b) => a.album.localeCompare(b.album));
    case 'year':
      return sortedSongs.sort((a, b) => a.year - b.year);
    case 'id':
      return sortedSongs.sort((a, b) => b.id - a.id); // Newest first
    default:
      return sortedSongs;
  }
};

// Get unique years from songs for filter options
export const getUniqueYears = (songs) => {
  const years = [...new Set(songs.map(song => song.year))];
  return years.sort((a, b) => b - a); // Most recent first
};

// Get statistics about the song collection
export const getSongStats = (songs) => {
  if (songs.length === 0) {
    return {
      totalSongs: 0,
      uniqueArtists: 0,
      uniqueAlbums: 0,
      yearRange: { min: 0, max: 0 },
      averageYear: 0
    };
  }
  
  const uniqueArtists = new Set(songs.map(song => song.artist)).size;
  const uniqueAlbums = new Set(songs.map(song => song.album)).size;
  const years = songs.map(song => song.year);
  const yearRange = { min: Math.min(...years), max: Math.max(...years) };
  const averageYear = Math.round(years.reduce((sum, year) => sum + year, 0) / years.length);
  
  return {
    totalSongs: songs.length,
    uniqueArtists,
    uniqueAlbums,
    yearRange,
    averageYear
  };
}; 