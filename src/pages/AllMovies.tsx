import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { movieApi, Movie } from "@/services/movieApi";
import { Search, Filter } from "lucide-react";

const AllMovies = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'all');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);

  const genres = [
    { value: 'all', label: 'All Genres' },
    { value: 'action', label: 'Action' },
    { value: 'comedy', label: 'Comedy' },
    { value: 'drama', label: 'Drama' },
    { value: 'horror', label: 'Horror' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'thriller', label: 'Thriller' },
    { value: 'romance', label: 'Romance' },
    { value: 'animation', label: 'Animation' }
  ];

  useEffect(() => {
    fetchMovies();
  }, [searchQuery, selectedGenre, currentPage]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      let newMovies: Movie[] = [];
      let pages = 1;

      if (searchQuery) {
        // Search for specific movies
        const searchResults = await movieApi.searchMovies(searchQuery, currentPage);
        newMovies = searchResults.Search || [];
        pages = Math.ceil(parseInt(searchResults.totalResults || '0') / 10);
      } else if (selectedGenre !== 'all') {
        // Search by genre using search API
        const searchResults = await movieApi.searchMovies(selectedGenre, currentPage);
        newMovies = searchResults.Search || [];
        pages = Math.ceil(parseInt(searchResults.totalResults || '0') / 10);
      } else {
        // Get top rated movies
        const result = await movieApi.getTopRatedMovies(currentPage);
        newMovies = result.movies;
        pages = result.totalPages;
      }

      setMovies(newMovies);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    updateSearchParams(value, selectedGenre, 1);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    updateSearchParams(searchQuery, genre, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateSearchParams(searchQuery, selectedGenre, page);
  };

  const updateSearchParams = (search: string, genre: string, page: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (genre !== 'all') params.set('genre', genre);
    if (page > 1) params.set('page', page.toString());
    setSearchParams(params);
  };

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
              Top Rated Movies
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the highest-rated movies of all time
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
              
              <Select value={selectedGenre} onValueChange={handleGenreChange}>
                <SelectTrigger className="w-full sm:w-48 bg-card border-border">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
            </div>
            
            {/* Active Filters */}
            {(searchQuery || selectedGenre !== 'all') && (
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary" className="animate-fade-in">
                    Search: {searchQuery}
                    <button
                      onClick={() => handleSearch('')}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedGenre !== 'all' && (
                  <Badge variant="secondary" className="animate-fade-in">
                    Genre: {genres.find(g => g.value === selectedGenre)?.label}
                    <button
                      onClick={() => handleGenreChange('all')}
                      className="ml-2 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-semibold mb-2">No movies found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie, index) => (
                <div
                  key={movie.imdbID}
                  className="animate-fade-in hover-scale"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <MovieCard
                    id={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    rating={parseFloat(movie.imdbRating || '0')}
                    poster={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.svg'}
                    onClick={handleMovieClick}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllMovies;