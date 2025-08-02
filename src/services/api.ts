const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const makeRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }
  
  return response.json();
};

// Auth API
export const authAPI = {
  async login(email: string, password: string) {
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string, name: string) {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  async verify() {
    return makeRequest('/auth/verify');
  },

  async logout() {
    return makeRequest('/auth/logout', {
      method: 'POST',
    });
  },

  async getProfile() {
    return makeRequest('/auth/profile');
  },

  async updateProfile(name?: string, email?: string) {
    return makeRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email }),
    });
  },
};

// Movies API
export const moviesAPI = {
  async search(query: string, page = 1) {
    return makeRequest(`/movies/search?q=${encodeURIComponent(query)}&page=${page}`);
  },

  async getById(id: string) {
    return makeRequest(`/movies/${id}`);
  },

  async create(movieData: any) {
    return makeRequest('/movies', {
      method: 'POST',
      body: JSON.stringify(movieData),
    });
  },

  async getFeatured() {
    return makeRequest('/movies/lists/featured');
  },

  async getTopRated(page = 1) {
    return makeRequest(`/movies/lists/top-rated?page=${page}`);
  },

  async getNewReleases() {
    return makeRequest('/movies/lists/new-releases');
  },

  async getCustomMovies(page = 1, limit = 20) {
    return makeRequest(`/movies/admin/custom-movies?page=${page}&limit=${limit}`);
  },

  async updateCustomMovie(id: string, movieData: any) {
    return makeRequest(`/movies/admin/custom-movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(movieData),
    });
  },

  async deleteCustomMovie(id: string) {
    return makeRequest(`/movies/admin/custom-movies/${id}`, {
      method: 'DELETE',
    });
  },
};

// Reviews API
export const reviewsAPI = {
  async create(movieId: string, movieSource: 'omdb' | 'custom', title: string, content: string, rating: number) {
    return makeRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify({ movieId, movieSource, title, content, rating }),
    });
  },

  async getByMovie(movieId: string, source = 'omdb', page = 1, limit = 20) {
    return makeRequest(`/reviews/movie/${movieId}?source=${source}&page=${page}&limit=${limit}`);
  },

  async getByUser(userId: string, page = 1, limit = 20) {
    return makeRequest(`/reviews/user/${userId}?page=${page}&limit=${limit}`);
  },

  async getMyReviews(page = 1, limit = 20) {
    return makeRequest(`/reviews/my-reviews?page=${page}&limit=${limit}`);
  },

  async getById(id: string) {
    return makeRequest(`/reviews/${id}`);
  },

  async update(id: string, title?: string, content?: string, rating?: number) {
    return makeRequest(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, rating }),
    });
  },

  async delete(id: string) {
    return makeRequest(`/reviews/${id}`, {
      method: 'DELETE',
    });
  },

  async markHelpful(id: string, helpful: boolean) {
    return makeRequest(`/reviews/${id}/helpful`, {
      method: 'POST',
      body: JSON.stringify({ helpful }),
    });
  },

  async getRecent(limit = 10) {
    return makeRequest(`/reviews/lists/recent?limit=${limit}`);
  },
};

// Watchlist API
export const watchlistAPI = {
  async add(movieId: string, movieSource: 'omdb' | 'custom', movieData: any) {
    return makeRequest('/watchlist', {
      method: 'POST',
      body: JSON.stringify({ movieId, movieSource, movieData }),
    });
  },

  async get(page = 1, limit = 50) {
    return makeRequest(`/watchlist?page=${page}&limit=${limit}`);
  },

  async remove(movieId: string, source = 'omdb') {
    return makeRequest(`/watchlist/${movieId}?source=${source}`, {
      method: 'DELETE',
    });
  },

  async check(movieId: string, source = 'omdb') {
    return makeRequest(`/watchlist/check/${movieId}?source=${source}`);
  },

  async checkMultiple(movies: Array<{ movieId: string; movieSource?: string }>) {
    return makeRequest('/watchlist/check-multiple', {
      method: 'POST',
      body: JSON.stringify({ movies }),
    });
  },

  async clear() {
    return makeRequest('/watchlist', {
      method: 'DELETE',
    });
  },

  async getPopular(limit = 10) {
    return makeRequest(`/watchlist/popular?limit=${limit}`);
  },

  async getStats() {
    return makeRequest('/watchlist/stats');
  },
};

export default {
  auth: authAPI,
  movies: moviesAPI,
  reviews: reviewsAPI,
  watchlist: watchlistAPI,
};