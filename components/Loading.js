import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed top-[50%] left-[50%] flex items-center justify-center bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
