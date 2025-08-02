import { useState, useEffect, createContext, useContext } from "react";
import { Movie } from "@/services/movieApi";
import { watchlistAPI } from "@/services/api";
import { useAuth } from "./useAuth";

interface WatchlistContextType {
  watchlist: Movie[];
  isLoading: boolean;
  addToWatchlist: (movie: Movie) => Promise<boolean>;
  removeFromWatchlist: (movieId: string, movieSource?: 'omdb' | 'custom') => Promise<boolean>;
  isInWatchlist: (movieId: string) => boolean;
  refreshWatchlist: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const loadWatchlist = async () => {
    if (!isAuthenticated) {
      setWatchlist([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await watchlistAPI.get();
      const movies = response.watchlist.map((item: any) => ({
        imdbID: item.movieId,
        Title: item.Title,
        Year: item.Year,
        Poster: item.Poster,
        imdbRating: item.imdbRating,
        Plot: item.Plot,
        Director: item.Director,
        Actors: item.Actors,
        Genre: item.Genre,
        Runtime: item.Runtime,
        Source: item.movieSource || 'omdb'
      }));
      setWatchlist(movies);
    } catch (error) {
      console.error('Failed to load watchlist:', error);
      setWatchlist([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, [isAuthenticated]);

  const addToWatchlist = async (movie: Movie): Promise<boolean> => {
    if (!isAuthenticated) {
      console.error('User must be authenticated to add to watchlist');
      return false;
    }

    try {
      const movieSource = movie.Source || (movie.imdbID.startsWith('custom_') ? 'custom' : 'omdb');
      const movieData = {
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        imdbRating: movie.imdbRating,
        Plot: movie.Plot,
        Director: movie.Director,
        Actors: movie.Actors,
        Genre: movie.Genre,
        Runtime: movie.Runtime
      };

      await watchlistAPI.add(movie.imdbID, movieSource, movieData);
      
      // Add to local state
      const updatedWatchlist = [...watchlist, { ...movie, Source: movieSource }];
      setWatchlist(updatedWatchlist);
      return true;
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
      return false;
    }
  };

  const removeFromWatchlist = async (movieId: string, movieSource: 'omdb' | 'custom' = null): Promise<boolean> => {
    if (!isAuthenticated) {
      console.error('User must be authenticated to remove from watchlist');
      return false;
    }

    try {
      // Determine source if not provided
      const source = movieSource || (movieId.startsWith('custom_') ? 'custom' : 'omdb');
      
      await watchlistAPI.remove(movieId, source);
      
      // Remove from local state
      const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== movieId);
      setWatchlist(updatedWatchlist);
      return true;
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
      return false;
    }
  };

  const isInWatchlist = (movieId: string): boolean => {
    return watchlist.some(movie => movie.imdbID === movieId);
  };

  const refreshWatchlist = async (): Promise<void> => {
    await loadWatchlist();
  };

  const value = {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    refreshWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};