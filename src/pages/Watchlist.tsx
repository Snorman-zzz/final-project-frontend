import { Heart, Clock, Star } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-4xl font-bold">Your Watchlist is Empty</h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Start adding movies to your watchlist to keep track of what you want to watch!
            </p>
            <Button onClick={() => navigate("/movies")} size="lg">
              Browse Movies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Watchlist</h1>
          <p className="text-muted-foreground">
            {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} in your watchlist
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-card rounded-lg overflow-hidden border shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            >
              <div className="relative">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                  alt={movie.Title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(movie.imdbID);
                      toast({
                        title: "Removed from Watchlist",
                        description: `${movie.Title} has been removed from your watchlist.`,
                      });
                    }}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
                {movie.imdbRating && (
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {movie.imdbRating}
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                  {movie.Title}
                </h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{movie.Year}</span>
                  {movie.Runtime && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {movie.Runtime}
                    </div>
                  )}
                </div>
                {movie.Genre && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {movie.Genre.split(', ').slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;