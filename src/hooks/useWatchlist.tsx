import { useState, useEffect, createContext, useContext } from "react";
import { Movie } from "@/services/movieApi";

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("movieWatchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const addToWatchlist = (movie: Movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("movieWatchlist", JSON.stringify(updatedWatchlist));
  };

  const removeFromWatchlist = (movieId: string) => {
    const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("movieWatchlist", JSON.stringify(updatedWatchlist));
  };

  const isInWatchlist = (movieId: string) => {
    return watchlist.some(movie => movie.imdbID === movieId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
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