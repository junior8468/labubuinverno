import React from 'react';
import { Shield } from 'lucide-react';

const SecurityFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-6">
            <Shield className="w-6 h-6" />
            <span className="text-lg font-semibold">Compra 100% Segura</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 max-w-2xl mx-auto">
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co/Psc05YPg/google-site-seguro-pt.png"
                alt="Google Site Seguro"
                className="h-12 object-contain"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co/dsv1w7vf/Reclameaqui.png"
                alt="Reclame Aqui"
                className="h-12 object-contain"
              />
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co/mCRrxDxL/SSL-removebg-preview.png"
                alt="SSL Certificado"
                className="h-12 object-contain"
              />
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>Seus dados estão protegidos com criptografia SSL</p>
            <p className="mt-1">Ambiente seguro e confiável para suas compras online</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SecurityFooter;