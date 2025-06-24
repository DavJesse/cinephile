import { Movie, MovieDetails, MovieSearchResponse } from '../types/movie';

// Use environment variables for API key and base URL
const API_KEY = import.meta.env.VITE_PUBLIC_OMDB_API_KEY;
const BASE_URL = `${import.meta.env.VITE_PUBLIC_OMDB_BASE_URL}?apikey=${API_KEY}&`;
console.log('API_KEY:', API_KEY);
console.log('BASE_URL:', BASE_URL);

// Demo data for when API key is not available
const DEMO_MOVIES: Movie[] = [
  {
    Title: "The Dark Knight",
    Year: "2008",
    imdbID: "tt0468569",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  },
  {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991319/pexels-photo-7991319.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  },
  {
    Title: "Interstellar",
    Year: "2014",
    imdbID: "tt0816692",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  },
  {
    Title: "The Matrix",
    Year: "1999",
    imdbID: "tt0133093",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991664/pexels-photo-7991664.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  },
  {
    Title: "Pulp Fiction",
    Year: "1994",
    imdbID: "tt0110912",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991448/pexels-photo-7991448.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  },
  {
    Title: "The Godfather",
    Year: "1972",
    imdbID: "tt0068646",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991502/pexels-photo-7991502.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  },
  {
    Title: "Forrest Gump",
    Year: "1994",
    imdbID: "tt0109830",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991386/pexels-photo-7991386.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  },
  {
    Title: "Fight Club",
    Year: "1999",
    imdbID: "tt0137523",
    Type: "movie",
    Poster: "https://images.pexels.com/photos/7991340/pexels-photo-7991340.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop"
  }
];

const DEMO_MOVIE_DETAILS: MovieDetails = {
  Title: "The Dark Knight",
  Year: "2008",
  Rated: "PG-13",
  Released: "18 Jul 2008",
  Runtime: "152 min",
  Genre: "Action, Crime, Drama",
  Director: "Christopher Nolan",
  Writer: "Jonathan Nolan, Christopher Nolan, David S. Goyer",
  Actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
  Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  Language: "English, Mandarin",
  Country: "United States, United Kingdom",
  Awards: "Won 2 Oscars. 156 wins & 163 nominations total",
  Poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop",
  Ratings: [
    { Source: "Internet Movie Database", Value: "9.0/10" },
    { Source: "Rotten Tomatoes", Value: "94%" },
    { Source: "Metacritic", Value: "84/100" }
  ],
  Metascore: "84",
  imdbRating: "9.0",
  imdbVotes: "2,758,436",
  imdbID: "tt0468569",
  Type: "movie",
  DVD: "09 Dec 2008",
  BoxOffice: "$534,858,444",
  Production: "Warner Bros., Legendary Entertainment",
  Website: "N/A",
  Response: "True"
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  // If no API key is provided, return demo data for movies that match the search
  if (!API_KEY || API_KEY === 'YOUR_OMDB_API_KEY') {
    console.warn('OMDB API key not configured. Using demo data.');
    const filtered = DEMO_MOVIES.filter(movie => 
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.length > 0 ? filtered : DEMO_MOVIES.slice(0, 4);
  }

  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
    const data: MovieSearchResponse = await response.json();
    
    if (data.Response === 'True' && data.Search) {
      return data.Search;
    }
    
    return [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  // If no API key is provided, return demo data
  if (!API_KEY || API_KEY === 'YOUR_OMDB_API_KEY') {
    console.warn('OMDB API key not configured. Using demo data.');
    return DEMO_MOVIE_DETAILS;
  }

  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);
    const data: MovieDetails = await response.json();
    
    if (data.Response === 'True') {
      return data;
    }
    
    throw new Error('Movie not found');
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<Movie[]> => {
  // If no API key is provided, return demo data
  if (!API_KEY || API_KEY === 'YOUR_OMDB_API_KEY') {
    console.warn('OMDB API key not configured. Using demo data.');
    return DEMO_MOVIES;
  }

  // Since OMDB doesn't have a trending endpoint, we'll search for popular movies
  const trendingQueries = ['batman', 'marvel', 'star wars', 'avengers'];
  const allMovies: Movie[] = [];

  try {
    for (const query of trendingQueries) {
      const movies = await searchMovies(query);
      allMovies.push(...movies.slice(0, 2)); // Take 2 movies from each search
    }
    
    // Remove duplicates based on imdbID
    const uniqueMovies = allMovies.filter((movie, index, self) => 
      index === self.findIndex(m => m.imdbID === movie.imdbID)
    );
    
    return uniqueMovies.slice(0, 8); // Return up to 8 movies
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return DEMO_MOVIES;
  }
};