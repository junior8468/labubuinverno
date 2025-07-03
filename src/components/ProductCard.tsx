import React from 'react';
import { Star } from 'lucide-react';

const ProductCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-20">
      <div className="relative">
        <img
          src="https://i.ibb.co/pBcDbQtM/1.jpg"
          alt="Labubu Do Inverno"
          className="w-full h-80 object-contain bg-gray-50"
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          OFERTA
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Labubu Do Inverno
        </h3>
        
        <p className="text-gray-600 mb-4">
          Boneco colecionável da temporada De Inverno
        </p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">(127 avaliações)</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-gray-500 line-through text-sm">
              DE R$ 89,90
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-green-600">
              R$ 47,90
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;