import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import { movieApi, Movie } from "@/services/movieApi";

const Index = () => {
  const navigate = useNavigate();
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [featured, newMovies] = await Promise.all([
          movieApi.getFeaturedMovies(),
          movieApi.getNewReleases()
        ]);
        setFeaturedMovies(featured);
        setNewReleases(newMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  
  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Movies Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Movies</h2>
            <Button variant="outline" onClick={() => navigate('/movies')}>
              View All Movies
            </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {featuredMovies.slice(0, 6).map((movie) => (
              <MovieCard 
                key={movie.imdbID} 
                id={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                rating={parseFloat(movie.imdbRating || '0')}
                poster={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                onClick={handleMovieClick}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
