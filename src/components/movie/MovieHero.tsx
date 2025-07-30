import { Star, Calendar, Clock, Globe, Award, Share2, Copy, MessageCircle, Mail, Twitter, Facebook, Heart, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Movie } from "@/services/movieApi";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface MovieHeroProps {
  movie: Movie;
}

const MovieHero = ({ movie }: MovieHeroProps) => {
  const rating = parseFloat(movie.imdbRating || '0');
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const inWatchlist = isInWatchlist(movie.imdbID);

  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (inWatchlist) {
      removeFromWatchlist(movie.imdbID);
      toast({
        title: "Removed from Watchlist",
        description: `${movie.Title} has been removed from your watchlist.`,
      });
    } else {
      addToWatchlist(movie);
      toast({
        title: "Added to Watchlist",
        description: `${movie.Title} has been added to your watchlist.`,
      });
    }
  };
  
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80 z-10" />
      
      <div className="relative z-20 grid lg:grid-cols-5 gap-8 py-12">
        {/* Movie Poster */}
        <div className="lg:col-span-2">
          <div className="relative max-w-md mx-auto lg:mx-0">
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'} 
              alt={movie.Title}
              className="w-full rounded-xl shadow-2xl border border-border"
            />
            <div className="absolute -bottom-4 -right-4 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 fill-primary text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{rating}</div>
                  <div className="text-xs text-muted-foreground">IMDb</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Movie Info */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {movie.Title}
            </h1>
            
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{movie.Year}</span>
              </div>
              
              {movie.Runtime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.Runtime}</span>
                </div>
              )}
              
              {movie.Genre && (
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{movie.Genre}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>PG-13</span>
              </div>
            </div>
            
            {/* Genre badges */}
            {movie.Genre && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.Genre.split(', ').map((genre) => (
                  <Badge 
                    key={genre} 
                    variant="secondary" 
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Plot */}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Synopsis</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {movie.Plot}
              </p>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              size="lg" 
              className="rounded-full px-8"
              onClick={handleWatchlistToggle}
              variant={inWatchlist ? "secondary" : "default"}
            >
              {inWatchlist ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  In Watchlist
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Watchlist
                </>
              )}
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Share this movie</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const text = `Check out ${movie.Title} (${movie.Year}) - ${window.location.href}`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                    >
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                        window.open(url, '_blank');
                      }}
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const text = `Check out ${movie.Title} (${movie.Year})`;
                        const url = `https://wa.me/?text=${encodeURIComponent(`${text} - ${window.location.href}`)}`;
                        window.open(url, '_blank');
                      }}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        const subject = `Check out ${movie.Title}`;
                        const body = `I thought you might enjoy this movie: ${movie.Title} (${movie.Year})\n\n${window.location.href}`;
                        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                      }}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </div>
                  <div className="border-t pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(window.location.href);
                          alert('Link copied to clipboard!');
                        } catch (error) {
                          prompt('Copy this link:', window.location.href);
                        }
                      }}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;