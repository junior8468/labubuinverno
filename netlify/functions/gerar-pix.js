exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Parse request body
    const requestData = JSON.parse(event.body);
    
    // Extract data from request
    const {
      customerInfo,
      deliveryAddress,
      selectedShipping
    } = requestData;

    // Validate required data
    if (!customerInfo || !deliveryAddress || !selectedShipping) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Dados obrigatórios não fornecidos',
          required: ['customerInfo', 'deliveryAddress', 'selectedShipping']
        })
      };
    }

    // Product price in reais
    const productPrice = 47.90;
    
    // Shipping prices mapping
    const shippingPrices = {
      'sedex': 29.90,
      'pac': 24.49,
      'correios': 20.65
    };

    // Get shipping price
    const shippingPrice = shippingPrices[selectedShipping] || 0;
    
    // Calculate total amount
    const totalAmount = productPrice + shippingPrice;
    
    // Convert to centavos (cents)
    const amountInCents = Math.round(totalAmount * 100);

    // Get BullsPay secret key from environment
    const secretKey = process.env.VITE_BULLSPAY_SECRET_KEY;
    
    if (!secretKey) {
      console.error('VITE_BULLSPAY_SECRET_KEY não configurada');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Configuração de pagamento não encontrada' })
      };
    }

    // Prepare BullsPay request body
    const bullsPayBody = {
      amount: amountInCents,
      items: [
        {
          name: "Labubu Do Inverno",
          description: "Boneco colecionável da temporada De Inverno",
          quantity: 1,
          unit_price: Math.round(productPrice * 100),
          category: "collectibles"
        },
        {
          name: `Frete - ${selectedShipping.toUpperCase()}`,
          description: "Taxa de entrega",
          quantity: 1,
          unit_price: Math.round(shippingPrice * 100),
          category: "shipping"
        }
      ],
      customer: {
        name: customerInfo.name,
        email: customerInfo.email,
        document: customerInfo.cpf,
        phone: customerInfo.phone
      },
      billing_address: {
        street: deliveryAddress.street,
        number: deliveryAddress.number,
        complement: deliveryAddress.complement || '',
        neighborhood: deliveryAddress.neighborhood,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        zip_code: deliveryAddress.zipCode
      },
      shipping_address: {
        street: deliveryAddress.street,
        number: deliveryAddress.number,
        complement: deliveryAddress.complement || '',
        neighborhood: deliveryAddress.neighborhood,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        zip_code: deliveryAddress.zipCode
      },
      payment_method: "pix",
      notification_url: `${event.headers.origin || 'https://your-site.netlify.app'}/.netlify/functions/bullspay-webhook`
    };

    console.log('Enviando requisição para BullsPay:', {
      amount: amountInCents,
      customer: bullsPayBody.customer.name,
      items_count: bullsPayBody.items.length
    });

    // Make request to BullsPay API
    const response = await fetch('https://pay.bullspay.net/api/v1/transaction.purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(bullsPayBody)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Erro na resposta da BullsPay:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: 'Erro ao processar pagamento',
          details: responseData
        })
      };
    }

    console.log('✅ PIX gerado com sucesso:', {
      transaction_id: responseData.id,
      amount: amountInCents,
      status: responseData.status
    });

    // Return successful response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        transaction: responseData,
        summary: {
          product_price: productPrice,
          shipping_price: shippingPrice,
          total_amount: totalAmount,
          amount_in_cents: amountInCents
        }
      })
    };

  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Erro interno do servidor',
        message: error.message
      })
    };
  }
};