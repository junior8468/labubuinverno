exports.handler = async function(event, context) {
  
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Método não permitido.'
    };
  }

  try {
    const payload = JSON.parse(event.body);

    console.log('✅ Webhook da BullsPay recebido com sucesso!');
    console.log('Status do Pagamento:', payload.status);
    console.log('ID do Pagamento:', payload.paymentId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Webhook recebido!' })
    };

  } catch (error) {
    console.error('Erro ao processar o webhook:', error);
    return {
      statusCode: 500,
      body: 'Erro ao processar o webhook.'
    };
  }
};