import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--gradient-radial)' }}>
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          <span className="text-foreground block mb-2">
            Discover & Share
          </span>
          <span className="bg-gradient-social bg-clip-text text-transparent">
            ContentHub
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
          Your ultimate destination for movie reviews, ratings, and cinematic discoveries. 
          Join the community of film enthusiasts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/movies">
            <Button 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto"
            >
              <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Explore Movies
            </Button>
          </Link>
          
          <Link to="/about">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full border-foreground/20 bg-transparent hover:bg-foreground/10 text-foreground font-semibold w-full sm:w-auto"
            >
              <Info className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;