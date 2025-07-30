import { useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Flag, Edit3, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "@/components/ReviewCard";
import AddReview from "./AddReview";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Mock reviews data - replace with real data
const mockReviews = [
  {
    author: "MovieCritic2024",
    rating: 5,
    content: "An absolute masterpiece that transcends the superhero genre. The cinematography is breathtaking, and every performance is pitch-perfect. Heath Ledger's Joker is a tour de force that will be remembered for generations. This film raises the bar for what comic book movies can achieve.",
    date: "2 days ago",
    title: "A Genre-Defining Masterpiece",
    helpful: 156,
    total: 178
  },
  {
    author: "CinemaEnthusiast",
    rating: 4,
    content: "Visually stunning with incredible action sequences. The moral complexity adds depth beyond typical superhero fare. While some plot points feel rushed, the overall experience is unforgettable. Nolan's direction creates a gritty, realistic Gotham that feels lived-in.",
    date: "5 days ago",
    title: "Dark, Complex, and Visually Striking",
    helpful: 89,
    total: 102
  },
  {
    author: "FilmBuff1985",
    rating: 5,
    content: "This movie redefined what superhero films could be. The psychological depth, practical effects, and Hans Zimmer's score create an immersive experience. Every scene serves the story, and the themes of chaos vs order resonate long after the credits roll.",
    date: "1 week ago",
    title: "Redefining the Superhero Genre",
    helpful: 234,
    total: 267
  }
];

const ReviewsSection = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setShowAddReview(true);
  };
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">User Reviews</h2>
          <span className="text-muted-foreground">({mockReviews.length} reviews)</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button variant="outline" size="sm">
            Most Helpful
          </Button>
        </div>
      </div>
      
      {/* Review Stats */}
      <Card className="bg-card/30 border-border">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">8.7</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">2.1K</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">92%</div>
              <div className="text-sm text-muted-foreground">Recommended</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Write Review Toggle Button */}
      <div className="my-8">
        {!showAddReview ? (
          <div className="text-center">
            <Button 
              onClick={handleWriteReview}
              size="lg" 
              className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <Edit3 className="mr-2 h-5 w-5" />
              Write a Review
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Write Your Review</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAddReview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AddReview 
              isVisible={showAddReview} 
              onClose={() => setShowAddReview(false)} 
            />
          </div>
        )}
      </div>
      
      <Separator className="my-8" />
      
      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Recent Reviews</h3>
        
        {mockReviews.map((review, index) => (
          <Card key={index} className="bg-card/50 border-border hover:bg-card/70 transition-colors">
            <CardContent className="p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {review.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.author}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                </div>
              </div>
              
              {/* Review Title */}
              <h5 className="font-semibold text-lg mb-3">{review.title}</h5>
              
              {/* Review Content */}
              <p className="text-foreground/90 leading-relaxed mb-4">{review.content}</p>
              
              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    Helpful ({review.helpful})
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    Not Helpful
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Flag className="mr-1 h-4 w-4" />
                  Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Load More */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg" className="rounded-full px-8">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;