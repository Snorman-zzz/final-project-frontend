import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Film, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              ContentHub
            </span>
          </Link>


          {/* Navigation & Auth */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/auth?mode=login">
                  <Button variant="ghost" size="sm" className="text-sm md:text-base">Login</Button>
                </Link>
                
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="text-sm md:text-base">Sign Up</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {user?.role === 'admin' ? (
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <User className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => navigate("/watchlist")}>
                        <Heart className="mr-2 h-4 w-4" />
                        My Watchlist
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => { logout(); navigate("/"); }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;