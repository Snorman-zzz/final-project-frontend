import { User, Award, Building, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Movie } from "@/services/movieApi";

interface MovieDetailsProps {
  movie: Movie;
}

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cast & Crew */}
      <div className="lg:col-span-2 space-y-6">
        {/* Director */}
        {movie.Director && movie.Director !== 'N/A' && (
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Director</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {movie.Director.split(', ').map((director) => (
                  <div key={director} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{director}</p>
                      <p className="text-sm text-muted-foreground">Director</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Cast */}
        {movie.Actors && movie.Actors !== 'N/A' && (
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Top Cast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {movie.Actors.split(', ').slice(0, 6).map((actor) => (
                  <div key={actor} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{actor}</p>
                      <p className="text-sm text-muted-foreground">Actor</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Technical Details */}
      <div className="space-y-6">
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-primary" />
              <span>Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {movie.Year && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Release Year</span>
                <span className="font-medium">{movie.Year}</span>
              </div>
            )}
            
            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Runtime</span>
                <span className="font-medium">{movie.Runtime}</span>
              </div>
            )}
            
            {movie.Genre && movie.Genre !== 'N/A' && (
              <>
                <Separator />
                <div>
                  <span className="text-muted-foreground block mb-2">Genres</span>
                  <div className="flex flex-wrap gap-1">
                    {movie.Genre.split(', ').map((genre) => (
                      <span 
                        key={genre}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {movie.imdbRating && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IMDb Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-primary">{movie.imdbRating}</span>
                    <span className="text-muted-foreground text-sm">/10</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        {/* Additional Info */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>Production</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country</span>
              <span className="font-medium">United States</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Language</span>
              <span className="font-medium">English</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-medium">$185M</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Box Office</span>
              <span className="font-medium">$1.005B</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovieDetails;