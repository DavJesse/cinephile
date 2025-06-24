import React from 'react';
import { Film, Github, Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative z-20 bg-black/20 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Cinephile</h1>
              <p className="text-xs text-gray-400">Movie Discovery</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for movie lovers</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;