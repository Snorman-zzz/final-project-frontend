import { moviesAPI } from './api';

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
  Source?: 'omdb' | 'custom';
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  page?: number;
}

export const movieApi = {
  // Search for movies (now searches both OMDB and custom database)
  searchMovies: async (query: string, page: number = 1): Promise<SearchResponse> => {
    try {
      return await moviesAPI.search(query, page);
    } catch (error) {
      console.error('Movie search error:', error);
      return {
        Search: [],
        totalResults: '0',
        Response: 'False',
        Error: 'Search failed'
      };
    }
  },

  // Get movie details by ID (handles both OMDB and custom movies)
  getMovieById: async (id: string): Promise<Movie> => {
    try {
      return await moviesAPI.getById(id);
    } catch (error) {
      console.error('Movie detail fetch error:', error);
      return {
        imdbID: id,
        Title: '',
        Year: '',
        Poster: '',
        Response: 'False',
        Error: 'Movie not found'
      };
    }
  },

  // Get featured movies (OMDB + Custom combined)
  getFeaturedMovies: async (): Promise<Movie[]> => {
    try {
      return await moviesAPI.getFeatured();
    } catch (error) {
      console.error('Featured movies fetch error:', error);
      return [];
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<{ movies: Movie[], totalPages: number }> => {
    try {
      return await moviesAPI.getTopRated(page);
    } catch (error) {
      console.error('Top rated movies fetch error:', error);
      return { movies: [], totalPages: 0 };
    }
  },

  // Get new releases
  getNewReleases: async (): Promise<Movie[]> => {
    try {
      return await moviesAPI.getNewReleases();
    } catch (error) {
      console.error('New releases fetch error:', error);
      return [];
    }
  },

  // Create new custom movie (admin only)
  createMovie: async (movieData: any): Promise<{ success: boolean; movie?: Movie; error?: string }> => {
    try {
      const response = await moviesAPI.create(movieData);
      return response;
    } catch (error) {
      console.error('Movie creation error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to create movie' };
    }
  }
};