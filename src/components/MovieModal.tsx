import React from 'react';
import { X, Star, Calendar, Clock, Users, Award, ExternalLink } from 'lucide-react';
import { MovieDetails } from '../types/movie';

interface MovieModalProps {
  movie: MovieDetails;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          {/* Hero Section */}
          <div className="relative">
            <div className="flex flex-col md:flex-row">
              {/* Poster */}
              <div className="md:w-1/3 lg:w-1/4">
                {hasValidPoster ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-64 md:h-auto object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-80 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">No Poster Available</span>
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <div className="flex-1 p-6 md:p-8">
                <div className="mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {movie.Title}
                  </h1>
                  <p className="text-gray-400 text-lg">{movie.Year}</p>
                </div>

                {/* Ratings */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{movie.imdbRating}</span>
                      <span className="text-gray-400">/10</span>
                    </div>
                  )}
                  
                  {movie.Ratings?.map((rating, index) => (
                    <div key={index} className="bg-gray-700/50 px-3 py-1 rounded-lg">
                      <span className="text-gray-300 text-sm">
                        {rating.Source}: <span className="text-white">{rating.Value}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {movie.Runtime && movie.Runtime !== 'N/A' && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{movie.Runtime}</span>
                    </div>
                  )}
                  
                  {movie.Released && movie.Released !== 'N/A' && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>{movie.Released}</span>
                    </div>
                  )}
                  
                  {movie.Director && movie.Director !== 'N/A' && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span>Dir: {movie.Director}</span>
                    </div>
                  )}
                  
                  {movie.Awards && movie.Awards !== 'N/A' && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Award className="w-4 h-4" />
                      <span className="truncate">{movie.Awards}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.Genre && movie.Genre !== 'N/A' && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {movie.Genre.split(', ').map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Plot */}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className="px-6 md:px-8 pb-6">
              <h3 className="text-xl font-semibold text-white mb-3">Plot</h3>
              <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>
          )}

          {/* Cast & Crew */}
          <div className="px-6 md:px-8 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movie.Actors && movie.Actors !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                  <p className="text-gray-300">{movie.Actors}</p>
                </div>
              )}
              
              {movie.Writer && movie.Writer !== 'N/A' && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Writers</h3>
                  <p className="text-gray-300">{movie.Writer}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="px-6 md:px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {movie.Country && movie.Country !== 'N/A' && (
                <div>
                  <span className="text-gray-400">Country:</span>
                  <p className="text-white">{movie.Country}</p>
                </div>
              )}
              
              {movie.Language && movie.Language !== 'N/A' && (
                <div>
                  <span className="text-gray-400">Language:</span>
                  <p className="text-white">{movie.Language}</p>
                </div>
              )}
              
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div>
                  <span className="text-gray-400">Box Office:</span>
                  <p className="text-white">{movie.BoxOffice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;