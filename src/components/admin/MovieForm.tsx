import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface MovieFormData {
  title: string;
  year: string;
  runtime: string;
  director: string;
  cast: string[];
  genre: string[];
  plot: string;
  poster: string;
  imdbRating: string;
  language: string;
  country: string;
  awards: string;
  boxOffice: string;
}

interface MovieFormProps {
  onSubmit: (data: MovieFormData) => void;
  isLoading?: boolean;
}

export const MovieForm = ({ onSubmit, isLoading = false }: MovieFormProps) => {
  const [formData, setFormData] = useState<MovieFormData>({
    title: "",
    year: "",
    runtime: "",
    director: "",
    cast: [],
    genre: [],
    plot: "",
    poster: "",
    imdbRating: "",
    language: "",
    country: "",
    awards: "",
    boxOffice: "",
  });

  const [newCastMember, setNewCastMember] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const addCastMember = () => {
    if (newCastMember.trim()) {
      setFormData(prev => ({
        ...prev,
        cast: [...prev.cast, newCastMember.trim()]
      }));
      setNewCastMember("");
    }
  };

  const removeCastMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cast: prev.cast.filter((_, i) => i !== index)
    }));
  };

  const addGenre = () => {
    if (newGenre.trim()) {
      setFormData(prev => ({
        ...prev,
        genre: [...prev.genre, newGenre.trim()]
      }));
      setNewGenre("");
    }
  };

  const removeGenre = (index: number) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the movie's basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="runtime">Runtime</Label>
                <Input
                  id="runtime"
                  name="runtime"
                  placeholder="120 min"
                  value={formData.runtime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="director">Director</Label>
              <Input
                id="director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imdbRating">IMDb Rating</Label>
              <Input
                id="imdbRating"
                name="imdbRating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.imdbRating}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cast & Genres</CardTitle>
            <CardDescription>Manage cast members and genres</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cast Members</Label>
              <div className="flex space-x-2">
                <Input
                  value={newCastMember}
                  onChange={(e) => setNewCastMember(e.target.value)}
                  placeholder="Add cast member"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCastMember())}
                />
                <Button type="button" size="icon" onClick={addCastMember}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.cast.map((member, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {member}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeCastMember(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Genres</Label>
              <div className="flex space-x-2">
                <Input
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                  placeholder="Add genre"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
                />
                <Button type="button" size="icon" onClick={addGenre}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.genre.map((genre, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {genre}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeGenre(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Additional Details</CardTitle>
          <CardDescription>Plot, media, and production information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plot">Plot</Label>
            <Textarea
              id="plot"
              name="plot"
              rows={4}
              value={formData.plot}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="poster">Poster URL</Label>
            <Input
              id="poster"
              name="poster"
              type="url"
              value={formData.poster}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="awards">Awards</Label>
            <Input
              id="awards"
              name="awards"
              value={formData.awards}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="boxOffice">Box Office</Label>
            <Input
              id="boxOffice"
              name="boxOffice"
              value={formData.boxOffice}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Movie"}
        </Button>
      </div>
    </form>
  );
};