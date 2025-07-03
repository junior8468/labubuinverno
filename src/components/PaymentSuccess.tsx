import React from 'react';
import { CheckCircle, Package } from 'lucide-react';

interface PaymentSuccessProps {
  isVisible: boolean;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="text-center">
        <div className="mb-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">
            Pagamento Aprovado!
          </h2>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <p className="text-green-800 font-semibold">
            Seu pedido foi confirmado com sucesso!
          </p>
          <p className="text-sm text-green-700 mt-1">
            Você receberá um e-mail com os detalhes da compra
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Package className="w-5 h-5" />
          <span className="text-sm">Pedido #12345 processado</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;