const API_KEY = '38c2cec1';
const BASE_URL = 'https://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
  Response?: string;
  Error?: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export const movieApi = {
  // Search for movies
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
    );
    return response.json();
  },

  // Get movie details by ID
  getMovieById: async (id: string): Promise<Movie> => {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`
    );
    return response.json();
  },

  // Get popular movies (using predefined search terms)
  getFeaturedMovies: async (): Promise<Movie[]> => {
    const popularSearches = ['Batman', 'Marvel', 'Star Wars', 'Inception', 'Avatar', 'Titanic'];
    const results: Movie[] = [];
    
    for (const search of popularSearches) {
      try {
        const response = await movieApi.searchMovies(search);
        if (response.Search && response.Search.length > 0) {
          const movie = response.Search[0];
          // Get full details for better ratings
          const details = await movieApi.getMovieById(movie.imdbID);
          results.push(details);
        }
      } catch (error) {
        console.error(`Error fetching movies for ${search}:`, error);
      }
    }
    
    return results;
  },

  // Get top rated movies across multiple searches
  getTopRatedMovies: async (page: number = 1): Promise<{ movies: Movie[], totalPages: number }> => {
    const searchTerms = [
      'Godfather', 'Shawshank', 'Dark Knight', 'Pulp Fiction', 'Lord of the Rings',
      'Fight Club', 'Forrest Gump', 'Inception', 'Matrix', 'Goodfellas',
      'Silence of the Lambs', 'Saving Private Ryan', 'Terminator', 'Alien',
      'Casablanca', 'Citizen Kane', 'Vertigo', 'Psycho', 'Taxi Driver',
      'Apocalypse Now', 'Chinatown', 'Once Upon a Time', 'Interstellar'
    ];
    
    const moviesPerPage = 16;
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const pageSearchTerms = searchTerms.slice(startIndex, endIndex);
    
    const results: Movie[] = [];
    
    for (const term of pageSearchTerms) {
      try {
        const response = await movieApi.searchMovies(term);
        if (response.Search && response.Search.length > 0) {
          // Get the first (usually most relevant) movie
          const movie = response.Search[0];
          const details = await movieApi.getMovieById(movie.imdbID);
          
          // Only include movies with good ratings
          if (details.imdbRating && parseFloat(details.imdbRating) >= 7.0) {
            results.push(details);
          }
        }
      } catch (error) {
        console.error(`Error fetching movie for ${term}:`, error);
      }
    }
    
    // Sort by rating (highest first)
    results.sort((a, b) => parseFloat(b.imdbRating || '0') - parseFloat(a.imdbRating || '0'));
    
    const totalPages = Math.ceil(searchTerms.length / moviesPerPage);
    return { movies: results, totalPages };
  },

  // Get new releases (recent movies)
  getNewReleases: async (): Promise<Movie[]> => {
    const currentYear = new Date().getFullYear();
    const searches = ['action', 'drama', 'comedy', 'thriller'];
    const results: Movie[] = [];
    
    for (const search of searches) {
      try {
        const response = await fetch(
          `${BASE_URL}?apikey=${API_KEY}&s=${search}&y=${currentYear}`
        );
        const data = await response.json();
        if (data.Search && data.Search.length > 0) {
          const movie = data.Search[0];
          const details = await movieApi.getMovieById(movie.imdbID);
          results.push(details);
        }
      } catch (error) {
        console.error(`Error fetching new releases for ${search}:`, error);
      }
    }
    
    return results;
  }
};