import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieHero from "@/components/movie/MovieHero";
import MovieDetails from "@/components/movie/MovieDetails";
import ReviewsSection from "@/components/movie/ReviewsSection";
import { movieApi, Movie } from "@/services/movieApi";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const movieData = await movieApi.getMovieById(id);
        
        if (movieData.Response === 'False') {
          setError(movieData.Error || 'Movie not found');
        } else {
          setMovie(movieData);
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-[2/3] bg-muted rounded-xl" />
              </div>
              <div className="lg:col-span-3 space-y-4">
                <div className="h-12 bg-muted rounded" />
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-semibold mb-2">Movie Not Found</h3>
            <p className="text-muted-foreground mb-6">{error || 'The movie you are looking for does not exist.'}</p>
            <Button onClick={() => navigate('/')} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Movie Hero Section */}
        <MovieHero movie={movie} />
        
        <Separator className="my-12" />
        
        {/* Movie Details */}
        <MovieDetails movie={movie} />
        
        <Separator className="my-12" />
        
        {/* Reviews Section */}
        {movie && (
          <ReviewsSection 
            movieId={movie.imdbID} 
            movieSource={movie.Source || (movie.imdbID.startsWith('custom_') ? 'custom' : 'omdb')}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetail;