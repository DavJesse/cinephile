import React, { useState, useEffect } from 'react';
import { Search, Star, Calendar, Clock, TrendingUp, Film } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import LoadingSpinner from './components/LoadingSpinner';
import { Movie, MovieDetails } from './types/movie';
import { searchMovies, getMovieDetails, getTrendingMovies } from './services/omdbApi';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const loadTrendingMovies = async () => {
    try {
      setIsLoadingTrending(true);
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    } catch (error) {
      console.error('Error loading trending movies:', error);
    } finally {
      setIsLoadingTrending(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    try {
      setIsLoading(true);
      setSearchQuery(query);
      setHasSearched(true);
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = async (movie: Movie) => {
    try {
      const details = await getMovieDetails(movie.imdbID);
      setSelectedMovie(details);
      setShowModal(true);
    } catch (error) {
      console.error('Error loading movie details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        <Header />
        
        <main className="relative z-10 container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Film className="w-12 h-12 text-purple-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Cinephile
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover your next favorite movie. Search, explore, and dive deep into the world of cinema.
            </p>
            
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Search Results */}
          {hasSearched && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Search className="w-6 h-6 mr-2" />
                Search Results
                {movies.length > 0 && (
                  <span className="text-purple-400 ml-2">({movies.length} found)</span>
                )}
              </h2>
              
              {isLoading ? (
                <LoadingSpinner />
              ) : movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => handleMovieSelect(movie)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    No movies found for "{searchQuery}". Try a different search term.
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Trending Section */}
          {!hasSearched && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Trending Movies
              </h2>
              
              {isLoadingTrending ? (
                <LoadingSpinner />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {trendingMovies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => handleMovieSelect(movie)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </main>

        {/* Movie Details Modal */}
        {showModal && selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;