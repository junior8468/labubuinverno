import React, { useState } from 'react';
import { QrCode, Copy, Clock, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeSectionProps {
  isVisible: boolean;
  pixData?: any;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ isVisible, pixData }) => {
  const [copied, setCopied] = useState(false);

  if (!isVisible || !pixData) return null;

  const handleCopyPixCode = async () => {
    try {
      const pixCode = pixData.transaction?.pix_code || pixData.transaction?.qr_code || pixData.transaction?.qr_code_text || 'PIX_CODE_PLACEHOLDER';
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar código PIX:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Get the PIX code for QR generation
  const pixCode = pixData.transaction?.pix_code || 
                  pixData.transaction?.qr_code || 
                  pixData.transaction?.qr_code_text || 
                  pixData.transaction?.pix_copy_paste ||
                  '00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426614174000520400005303986540547.905802BR5925NOME DO BENEFICIARIO6014CIDADE6304A9B2';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <QrCode className="w-5 h-5 mr-2 text-green-600" />
        Pagamento PIX
      </h2>
      
      {/* Transaction Summary */}
      {pixData.summary && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Resumo do Pedido</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Produto:</span>
              <span>{formatCurrency(pixData.summary.product_price)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete:</span>
              <span>{formatCurrency(pixData.summary.shipping_price)}</span>
            </div>
            <div className="flex justify-between font-bold text-green-600 pt-2 border-t">
              <span>Total:</span>
              <span>{formatCurrency(pixData.summary.total_amount)}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <div className="bg-gray-100 p-6 rounded-lg mb-4">
          {/* Use QRCodeSVG component to generate QR code */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCodeSVG
                value={pixCode}
                size={200}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={true}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">Escaneie o QR Code com seu banco</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 mb-2">Ou copie o código PIX:</p>
          <div className="flex items-center justify-between bg-white p-3 rounded border">
            <span className="text-xs font-mono text-gray-700 truncate mr-2 max-w-xs">
              {pixCode}
            </span>
            <button
              onClick={handleCopyPixCode}
              className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors flex-shrink-0"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-orange-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">PIX expira em 15 minutos</span>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 Após o pagamento, você receberá a confirmação automaticamente
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;