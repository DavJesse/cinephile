import React from 'react';
import { Film } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
        <Film className="absolute inset-0 w-6 h-6 text-purple-500 m-auto" />
      </div>
    </div>
  );
};

export default LoadingSpinner;