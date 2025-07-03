import React, { useState } from 'react';
import Banner from './components/Banner';
import CustomerInfo from './components/CustomerInfo';
import DeliveryAddress from './components/DeliveryAddress';
import ShippingOptions from './components/ShippingOptions';
import ProductCard from './components/ProductCard';
import QRCodeSection from './components/QRCodeSection';
import PaymentSuccess from './components/PaymentSuccess';
import SecurityFooter from './components/SecurityFooter';

interface CustomerData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

interface AddressData {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

function App() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pixData, setPixData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  // Form data states
  const [customerInfo, setCustomerInfo] = useState<CustomerData>({
    name: '',
    email: '',
    cpf: '',
    phone: ''
  });

  const [deliveryAddress, setDeliveryAddress] = useState<AddressData>({
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const [selectedShipping, setSelectedShipping] = useState<string>('');

  const validateForm = (): string | null => {
    // Validate customer info
    if (!customerInfo.name.trim()) return 'Nome é obrigatório';
    if (!customerInfo.email.trim()) return 'E-mail é obrigatório';
    if (!customerInfo.cpf.trim()) return 'CPF é obrigatório';
    if (!customerInfo.phone.trim()) return 'Telefone é obrigatório';

    // Validate delivery address
    if (!deliveryAddress.zipCode.trim()) return 'CEP é obrigatório';
    if (!deliveryAddress.street.trim()) return 'Endereço é obrigatório';
    if (!deliveryAddress.number.trim()) return 'Número é obrigatório';
    if (!deliveryAddress.neighborhood.trim()) return 'Bairro é obrigatório';
    if (!deliveryAddress.city.trim()) return 'Cidade é obrigatória';
    if (!deliveryAddress.state.trim()) return 'Estado é obrigatório';

    // Validate shipping selection
    if (!selectedShipping) return 'Selecione uma opção de frete';

    return null;
  };

  const handleGeneratePix = async () => {
    setError('');
    
    // Validate form data
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Prepare request data
      const requestData = {
        customerInfo: {
          name: customerInfo.name,
          email: customerInfo.email,
          cpf: customerInfo.cpf,
          phone: customerInfo.phone
        },
        deliveryAddress: {
          street: deliveryAddress.street,
          number: deliveryAddress.number,
          complement: deliveryAddress.complement,
          neighborhood: deliveryAddress.neighborhood,
          city: deliveryAddress.city,
          state: deliveryAddress.state,
          zipCode: deliveryAddress.zipCode
        },
        selectedShipping: selectedShipping
      };

      console.log('Enviando dados para gerar PIX:', requestData);

      // Make request to Netlify function
      const response = await fetch('/.netlify/functions/gerar-pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar PIX');
      }

      console.log('✅ PIX gerado com sucesso:', data);

      // Store PIX data and show QR code section
      setPixData(data);
      setShowQRCode(true);

      // Simulate payment approval after 10 seconds for demo
      setTimeout(() => {
        setShowQRCode(false);
        setShowSuccess(true);
      }, 10000);

    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      setError(error instanceof Error ? error.message : 'Erro ao gerar PIX');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      
      <div className="pt-16 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mobile: Produto aparece primeiro */}
            <div className="lg:hidden">
              <ProductCard />
            </div>
            
            {/* Desktop: Produto no lado esquerdo */}
            <div className="hidden lg:block lg:col-span-1">
              <ProductCard />
            </div>
            
            {/* Conteúdo Principal - Desktop: lado direito, Mobile: após produto */}
            <div className="lg:col-span-2 space-y-6">
              <CustomerInfo 
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
              />
              <DeliveryAddress 
                deliveryAddress={deliveryAddress}
                setDeliveryAddress={setDeliveryAddress}
              />
              <ShippingOptions 
                selectedShipping={selectedShipping}
                setSelectedShipping={setSelectedShipping}
              />
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}
              
              {/* Seções Condicionais */}
              <QRCodeSection 
                isVisible={showQRCode} 
                pixData={pixData}
              />
              <PaymentSuccess isVisible={showSuccess} />
              
              {/* Botão de Ação */}
              {!showQRCode && !showSuccess && (
                <button
                  onClick={handleGeneratePix}
                  disabled={isLoading}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-200 text-lg shadow-lg ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isLoading ? 'GERANDO PIX...' : 'GERAR PIX'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <SecurityFooter />
    </div>
  );
}

export default App;