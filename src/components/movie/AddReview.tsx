import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddReviewProps {
  isVisible: boolean;
  onClose?: () => void;
}

const AddReview = ({ isVisible, onClose }: AddReviewProps) => {
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const submitReview = () => {
    if (!reviewText.trim() || userRating === 0 || !reviewTitle.trim()) return;
    
    console.log("Review submitted:", { 
      title: reviewTitle,
      rating: userRating, 
      content: reviewText 
    });
    
    // Reset form
    setReviewText("");
    setUserRating(0);
    setReviewTitle("");
    
    // Close the review form after submission
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-card/50 to-card/30 border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-primary" />
          <span>Write a Review</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rating */}
        <div className="space-y-2">
          <Label>Your Rating</Label>
          <div className="flex items-center space-x-2">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  i < (hoverRating || userRating) 
                    ? "fill-primary text-primary" 
                    : "text-muted-foreground hover:text-primary/50"
                }`}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setUserRating(i + 1)}
              />
            ))}
            <span className="ml-2 text-sm font-medium">
              {userRating > 0 ? `${userRating}/10` : 'Rate this movie'}
            </span>
          </div>
        </div>
        
        {/* Review Title */}
        <div className="space-y-2">
          <Label htmlFor="review-title">Review Title</Label>
          <Input
            id="review-title"
            placeholder="Summarize your review in one line..."
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="bg-background/50 border-border"
          />
        </div>
        
        {/* Review Content */}
        <div className="space-y-2">
          <Label htmlFor="review-content">Your Review</Label>
          <Textarea
            id="review-content"
            placeholder="What did you think of this movie? Share your thoughts..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="min-h-32 bg-background/50 border-border resize-none"
          />
          <div className="text-xs text-muted-foreground text-right">
            {reviewText.length}/500 characters
          </div>
        </div>
        
        <Button 
          onClick={submitReview} 
          disabled={!reviewText.trim() || userRating === 0 || !reviewTitle.trim()}
          className="w-full rounded-full"
          size="lg"
        >
          <Send className="mr-2 h-4 w-4" />
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddReview;