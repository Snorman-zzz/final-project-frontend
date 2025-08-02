import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Flag, Edit3, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ReviewCard from "@/components/ReviewCard";
import AddReview from "./AddReview";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { reviewsAPI } from "@/services/api";
import { toast } from "sonner";

interface ReviewsSectionProps {
  movieId: string;
  movieSource?: 'omdb' | 'custom';
}

interface ReviewData {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  title: string;
  helpful: number;
  total: number;
}

interface ReviewStats {
  totalReviews: number;
  averageRating: string;
  recommendationPercentage: number;
}

const ReviewsSection = ({ movieId, movieSource = 'omdb' }: ReviewsSectionProps) => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [stats, setStats] = useState<ReviewStats>({ totalReviews: 0, averageRating: '0.0', recommendationPercentage: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await reviewsAPI.getByMovie(movieId, movieSource);
      
      if (response.reviews) {
        setReviews(response.reviews);
      }
      
      if (response.stats) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
      setError('Failed to load reviews');
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      loadReviews();
    }
  }, [movieId, movieSource]);

  const handleReviewAdded = () => {
    // Refresh reviews after a new review is added
    loadReviews();
  };

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
          <span className="text-muted-foreground">({stats.totalReviews} reviews)</span>
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
              <div className="text-3xl font-bold text-primary mb-1">{stats.averageRating}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.totalReviews}</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stats.recommendationPercentage}%</div>
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
              movieId={movieId}
              movieSource={movieSource}
              onClose={() => setShowAddReview(false)}
              onReviewAdded={handleReviewAdded}
            />
          </div>
        )}
      </div>
      
      <Separator className="my-8" />
      
      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Recent Reviews</h3>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-full"></div>
                        <div>
                          <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                          <div className="h-3 bg-muted rounded w-16"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-muted rounded w-20"></div>
                    </div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">{error}</p>
              <Button variant="outline" onClick={loadReviews} className="mt-4">
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : reviews.length === 0 ? (
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No reviews yet. Be the first to write one!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review, index) => (
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
          ))
        )}
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