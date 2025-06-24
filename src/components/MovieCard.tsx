import React from 'react';
import { Star, Calendar, Film } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const hasValidPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div 
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700/50 hover:border-purple-500/50"
      onClick={onClick}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-700">
        {hasValidPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
            <Film className="w-16 h-16 text-gray-500" />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Year Badge */}
        {movie.Year && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-gray-300" />
              <span className="text-xs text-white font-medium">{movie.Year}</span>
            </div>
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-purple-500/80 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-xs text-white font-medium uppercase">
            {movie.Type}
          </span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="capitalize">{movie.Type}</span>
          <span>{movie.Year}</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default MovieCard;