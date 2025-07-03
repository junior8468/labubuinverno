import React from 'react';
import Timer from './Timer';

const Banner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-600 py-3 px-4 shadow-lg">
      <Timer />
    </div>
  );
};

export default Banner;