import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MovieForm } from "@/components/admin/MovieForm";
import { toast } from "sonner";

const AddMovie = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/auth");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Here you would make an API call to save the movie
      console.log("Saving movie:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Movie added successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error("Failed to save movie. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New Movie</h2>
          <p className="text-muted-foreground">
            Create a new movie entry with detailed information.
          </p>
        </div>
        
        <MovieForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
};

export default AddMovie;