import React from 'react';
import { Truck, Clock, Package } from 'lucide-react';

interface ShippingOptionsProps {
  selectedShipping: string;
  setSelectedShipping: React.Dispatch<React.SetStateAction<string>>;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({ selectedShipping, setSelectedShipping }) => {
  const shippingOptions = [
    {
      id: 'sedex',
      name: 'SEDEX',
      timeframe: '1 a 2 dias',
      price: 'R$ 29,90',
      icon: <Truck className="w-5 h-5 text-green-600" />,
    },
    {
      id: 'pac',
      name: 'PAC',
      timeframe: '5 a 7 dias',
      price: 'R$ 24,49',
      icon: <Package className="w-5 h-5 text-green-600" />,
    },
    {
      id: 'correios',
      name: 'CORREIOS',
      timeframe: '7 a 14 dias',
      price: 'R$ 20,65',
      icon: <Clock className="w-5 h-5 text-green-600" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Truck className="w-5 h-5 mr-2 text-green-600" />
        Escolha o Frete
      </h2>
      
      <div className="space-y-3">
        {shippingOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedShipping === option.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-300'
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={option.id}
              checked={selectedShipping === option.id}
              onChange={(e) => setSelectedShipping(e.target.value)}
              className="text-green-600 focus:ring-green-500"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {option.icon}
                  <span className="ml-2 font-semibold text-gray-800">
                    {option.name}
                  </span>
                </div>
                <span className="font-bold text-green-600">{option.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{option.timeframe}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingOptions;