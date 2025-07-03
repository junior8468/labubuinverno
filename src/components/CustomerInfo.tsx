import React from 'react';
import { User } from 'lucide-react';

interface CustomerData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface CustomerInfoProps {
  customerInfo: CustomerData;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerData>>;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customerInfo, setCustomerInfo }) => {
  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2 text-green-600" />
        Suas Informações
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Nome completo"
            value={customerInfo.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type="email"
            placeholder="E-mail"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="CPF"
            value={customerInfo.cpf}
            onChange={(e) => handleInputChange('cpf', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="relative">
          <input
            type="tel"
            placeholder="Telefone"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;