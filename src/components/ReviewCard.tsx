import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewCardProps {
  author: string;
  rating: number;
  content: string;
  date: string;
}

const ReviewCard = ({ author, rating, content, date }: ReviewCardProps) => {
  return (
    <Card className="bg-gradient-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-semibold">{author}</h4>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium">{rating}/5</span>
          </div>
        </div>
        
        <p className="text-foreground leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;