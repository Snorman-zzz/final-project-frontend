import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MovieCardProps {
  id: string;
  title: string;
  year: string;
  rating: number;
  poster: string;
  onClick?: (id: string) => void;
}

const MovieCard = ({ id, title, year, rating, poster, onClick }: MovieCardProps) => {
  return (
    <Card 
      className="group bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onClick?.(id)}
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-muted">
        <img 
          src={poster} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-2">{year}</p>
        
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-muted-foreground text-sm">/10</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;