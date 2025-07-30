import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Star, Users, Search, Heart, Film, Award, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "Advanced Search",
      description: "Find movies by genre, year, rating, and more with our powerful search engine."
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "User Reviews",
      description: "Read and write detailed reviews to help others discover their next favorite film."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Personal Watchlist",
      description: "Save movies you want to watch and keep track of your viewing progress."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Community Driven",
      description: "Join a passionate community of movie enthusiasts and share your cinematic journey."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Movies in Database" },
    { number: "50,000+", label: "User Reviews" },
    { number: "25,000+", label: "Active Users" },
    { number: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Film className="mr-2 h-4 w-4" />
              About ContentHub
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ultimate Movie
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent block">
                Discovery Platform
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              ContentHub is more than just a movie database. We're a community-driven platform 
              that connects film lovers, helps discover hidden gems, and makes movie night planning effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/movies">
                <Button size="lg" className="rounded-full">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Exploring
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="rounded-full">
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose ContentHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We've built the features you need to discover, track, and enjoy movies like never before.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  <Award className="mr-2 h-4 w-4" />
                  Our Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Making Movie Discovery Simple & Social
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We believe that finding your next favorite movie shouldn't be a chore. 
                  ContentHub combines the power of community reviews, personalized recommendations, 
                  and comprehensive movie data to create the ultimate film discovery experience.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <Shield className="mr-3 h-5 w-5 text-primary" />
                    Trusted reviews from real movie lovers
                  </li>
                  <li className="flex items-center">
                    <Search className="mr-3 h-5 w-5 text-primary" />
                    Powerful search and filtering tools
                  </li>
                  <li className="flex items-center">
                    <Heart className="mr-3 h-5 w-5 text-primary" />
                    Personal watchlists and tracking
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                  <Film className="h-24 w-24 mx-auto text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Join the Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Be part of a growing community of film enthusiasts sharing their passion for cinema.
                  </p>
                  <Link to="/auth">
                    <Button size="lg" className="rounded-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;